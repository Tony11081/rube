'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '~/components/ui/Button'

interface FileUploadItem {
  id: string
  name: string
  size: number
  type: string
  category: string
  file: File
  preview?: string
  progress?: number
  uploaded?: boolean
  error?: string
}

interface FileUploadManagerProps {
  onFilesAdded?: (files: FileUploadItem[]) => void
  maxFiles?: number
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
  categories: Array<{ id: string; name: string; icon: string }>
}

export function FileUploadManager({
  onFilesAdded,
  maxFiles = 10,
  maxFileSize = 50,
  acceptedTypes = ['image/*', 'application/pdf', '.zip', '.rar', '.psd', '.ai', '.sketch', '.fig'],
  categories
}: FileUploadManagerProps) {
  const [files, setFiles] = useState<FileUploadItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `文件大小不能超过 ${maxFileSize}MB`
    }

    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      return file.type.match(type.replace('*', '.*'))
    })

    if (!isValidType) {
      return '不支持的文件类型'
    }

    return null
  }

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: FileUploadItem[] = []

    Array.from(fileList).forEach((file, index) => {
      if (files.length + newFiles.length >= maxFiles) {
        return
      }

      const error = validateFile(file)
      const fileItem: FileUploadItem = {
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        category: categories[0]?.id || 'general',
        file,
        error,
        progress: 0,
        uploaded: false
      }

      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          fileItem.preview = e.target?.result as string
          setFiles(prev => prev.map(f => f.id === fileItem.id ? fileItem : f))
        }
        reader.readAsDataURL(file)
      }

      newFiles.push(fileItem)
    })

    setFiles(prev => [...prev, ...newFiles])
    onFilesAdded?.(newFiles)
  }, [files.length, maxFiles, categories, onFilesAdded])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles)
    }
  }, [processFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }, [processFiles])

  const updateFileCategory = (fileId: string, category: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, category } : file
    ))
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const simulateUpload = async (fileId: string) => {
    // Simulate upload progress
    const file = files.find(f => f.id === fileId)
    if (!file) return

    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ))
    }

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, uploaded: true, progress: 100 } : f
    ))
  }

  const uploadAllFiles = async () => {
    const unuploadedFiles = files.filter(f => !f.uploaded && !f.error)
    
    for (const file of unuploadedFiles) {
      await simulateUpload(file.id)
    }
  }

  const getFileIcon = (type: string, name: string): string => {
    if (type.startsWith('image/')) return '🖼️'
    if (type === 'application/pdf') return '📄'
    if (name.endsWith('.zip') || name.endsWith('.rar')) return '📦'
    if (name.endsWith('.psd')) return '🎨'
    if (name.endsWith('.ai')) return '✨'
    if (name.endsWith('.sketch')) return '💎'
    if (name.endsWith('.fig')) return '🎭'
    return '📁'
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-pink-400 bg-pink-50' 
            : 'border-gray-300 hover:border-pink-300 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-6xl">📁</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              上传数字资源文件
            </h3>
            <p className="text-gray-600 text-sm">
              拖拽文件到此处，或点击下方按钮选择文件
            </p>
          </div>
          
          <div className="space-y-2">
            <input
              type="file"
              id="file-upload"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <Button as="span" size="lg" className="cursor-pointer">
                📤 选择文件
              </Button>
            </label>
            
            <div className="text-xs text-gray-500 space-y-1">
              <div>支持格式: PDF, 图片, ZIP, PSD, AI, Sketch, Figma 等</div>
              <div>最大文件大小: {maxFileSize}MB | 最多 {maxFiles} 个文件</div>
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              已选择文件 ({files.length}/{maxFiles})
            </h3>
            <Button
              onClick={uploadAllFiles}
              disabled={files.every(f => f.uploaded || f.error)}
              size="sm"
            >
              🚀 全部上传
            </Button>
          </div>

          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {getFileIcon(file.type, file.name)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 truncate">
                          {file.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {file.type || '未知类型'}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ❌
                      </button>
                    </div>

                    {/* Category Selector */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-600 mb-1 block">分类</label>
                      <select
                        value={file.category}
                        onChange={(e) => updateFileCategory(file.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Progress Bar */}
                    {file.progress !== undefined && file.progress > 0 && !file.uploaded && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>上传中...</span>
                          <span>{file.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      {file.error && (
                        <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded">
                          ❌ {file.error}
                        </span>
                      )}
                      {file.uploaded && (
                        <span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded">
                          ✅ 上传成功
                        </span>
                      )}
                      {!file.uploaded && !file.error && file.progress === undefined && (
                        <button
                          onClick={() => simulateUpload(file.id)}
                          className="text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                        >
                          📤 开始上传
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}