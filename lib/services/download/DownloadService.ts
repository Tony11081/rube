import jwt from 'jsonwebtoken'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export interface DownloadTokenData {
  orderId: number
  userId?: string
  files: string[]
  expiresAt: number
  maxDownloads: number
  remainingDownloads: number
}

export interface StorageFile {
  key: string
  name: string
  size: number
  type: string
  url?: string
}

export interface StorageAdapter {
  getDownloadUrl(key: string, expiresIn?: number): Promise<string>
  uploadFile(key: string, file: Buffer, contentType: string): Promise<void>
  deleteFile(key: string): Promise<void>
  fileExists(key: string): Promise<boolean>
}

export class S3StorageAdapter implements StorageAdapter {
  private s3Client: S3Client
  private bucket: string

  constructor(config: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
    endpoint?: string
  }) {
    this.s3Client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      endpoint: config.endpoint,
      forcePathStyle: !!config.endpoint, // Required for custom endpoints like R2
    })
    this.bucket = config.bucket
  }

  async getDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    return await getSignedUrl(this.s3Client, command, { expiresIn })
  }

  async uploadFile(key: string, file: Buffer, contentType: string): Promise<void> {
    const { PutObjectCommand } = await import('@aws-sdk/client-s3')
    
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    })

    await this.s3Client.send(command)
  }

  async deleteFile(key: string): Promise<void> {
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3')
    
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    await this.s3Client.send(command)
  }

  async fileExists(key: string): Promise<boolean> {
    const { HeadObjectCommand } = await import('@aws-sdk/client-s3')
    
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
      
      await this.s3Client.send(command)
      return true
    } catch {
      return false
    }
  }
}

export class LocalStorageAdapter implements StorageAdapter {
  private basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  async getDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
    const token = jwt.sign(
      { key, exp: Math.floor(Date.now() / 1000) + expiresIn },
      process.env.JWT_SECRET || 'fallback-secret'
    )
    
    return `/api/download/local?token=${token}`
  }

  async uploadFile(key: string, file: Buffer, contentType: string): Promise<void> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const fullPath = path.join(this.basePath, key)
    const dir = path.dirname(fullPath)
    
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(fullPath, file)
  }

  async deleteFile(key: string): Promise<void> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const fullPath = path.join(this.basePath, key)
    await fs.unlink(fullPath)
  }

  async fileExists(key: string): Promise<boolean> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    try {
      const fullPath = path.join(this.basePath, key)
      await fs.access(fullPath)
      return true
    } catch {
      return false
    }
  }
}

export class DownloadService {
  private storage: StorageAdapter
  private jwtSecret: string
  private defaultTtl: number
  private defaultMaxDownloads: number

  constructor(
    storage: StorageAdapter,
    jwtSecret: string,
    options: {
      defaultTtl?: number
      defaultMaxDownloads?: number
    } = {}
  ) {
    this.storage = storage
    this.jwtSecret = jwtSecret
    this.defaultTtl = options.defaultTtl || 24 * 60 * 60 // 24 hours
    this.defaultMaxDownloads = options.defaultMaxDownloads || 5
  }

  createDownloadToken(data: {
    orderId: number
    userId?: string
    files: string[]
    ttl?: number
    maxDownloads?: number
  }): string {
    const expiresAt = Math.floor(Date.now() / 1000) + (data.ttl || this.defaultTtl)
    
    const tokenData: DownloadTokenData = {
      orderId: data.orderId,
      userId: data.userId,
      files: data.files,
      expiresAt,
      maxDownloads: data.maxDownloads || this.defaultMaxDownloads,
      remainingDownloads: data.maxDownloads || this.defaultMaxDownloads,
    }

    return jwt.sign(tokenData, this.jwtSecret)
  }

  verifyDownloadToken(token: string): DownloadTokenData | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as DownloadTokenData
      
      if (decoded.expiresAt < Math.floor(Date.now() / 1000)) {
        return null // Token expired
      }
      
      if (decoded.remainingDownloads <= 0) {
        return null // No downloads remaining
      }
      
      return decoded
    } catch {
      return null
    }
  }

  async getDownloadUrl(storageKey: string, expiresIn = 3600): Promise<string> {
    return await this.storage.getDownloadUrl(storageKey, expiresIn)
  }

  async uploadFile(storageKey: string, file: Buffer, contentType: string): Promise<void> {
    await this.storage.uploadFile(storageKey, file, contentType)
  }

  async deleteFile(storageKey: string): Promise<void> {
    await this.storage.deleteFile(storageKey)
  }

  async fileExists(storageKey: string): Promise<boolean> {
    return await this.storage.fileExists(storageKey)
  }

  static createStorageAdapter(type: string, config: any): StorageAdapter {
    switch (type) {
      case 's3':
      case 'r2':
        return new S3StorageAdapter(config)
      case 'local':
        return new LocalStorageAdapter(config.basePath || './storage')
      default:
        throw new Error(`Unsupported storage type: ${type}`)
    }
  }

  static generateStorageKey(productId: number, fileName: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `products/${productId}/${timestamp}-${random}-${fileName}`
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  static getFileTypeIcon(fileType: string): string {
    const type = fileType.toLowerCase()
    
    if (type.includes('pdf')) return '📄'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    if (type.includes('image')) return '🖼️'
    if (type.includes('video')) return '🎥'
    if (type.includes('audio')) return '🎵'
    if (type.includes('text') || type.includes('document')) return '📝'
    
    return '📁'
  }
}