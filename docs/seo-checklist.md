# SEO 排查清单 - 后端重点关注项

本文档列出了后端开发在处理 SEO 相关问题时需要重点关注的检查项。请在代码审查和部署前进行全面检查。

## 1. URL 暴露与路由配置

### 路由注册检查
- [ ] 确认所有需要收录的页面路由都在后端路由表中正确注册
- [ ] 检查动态参数路由（如 `/product/[id]`、`/category/[slug]`）是否正确生成静态或 SSR 页面
- [ ] 验证路由中的条件分支（如用户登录态判断）不会影响 Googlebot 访问

### 示例代码检查
```typescript
// 检查类似这样的动态路由配置
export async function generateStaticParams() {
  const products = await db.product.findMany({
    where: { status: 'published' }  // 确保条件不会排除有效内容
  })
  
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}
```

## 2. Sitemap 自动生成逻辑

### 数据源检查
- [ ] 检查 sitemap.xml 生成模块是否遗漏数据表
- [ ] 确认缓存更新机制是否正常运行

### 数据过滤检查
- [ ] 核对 URL 列表生成逻辑：
  - 分页处理是否完整
  - 软删除标记（deleted_at、is_published）是否正确过滤
  - 时间戳更新是否准确

### 示例检查项
```typescript
// 检查类似这样的 sitemap 生成逻辑
async function generateSitemap() {
  const products = await db.product.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
      // 确保其他过滤条件不会排除有效内容
    }
  })
  
  // 检查分页处理
  const BATCH_SIZE = 1000
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    // ...
  }
}
```

## 3. robots.txt 与 Meta Tag 输出

### robots.txt 检查
- [ ] 检查动态生成的 robots.txt 规则
- [ ] 确认黑名单规则不会误伤有效路径

### Meta Tags 检查
- [ ] 检查模板渲染中的条件判断：
  ```html
  <meta name="robots" content="noindex"> <!-- 确认输出条件 -->
  <link rel="canonical" href="..."> <!-- 验证 URL 正确性 -->
  ```

## 4. HTTP 响应头配置

### 中间件检查
- [ ] 确认无 `X-Robots-Tag: noindex` 设置
- [ ] 检查重定向链路是否必要且合理

### 示例检查
```typescript
// 中间件配置检查
app.use((req, res, next) => {
  // 检查此类响应头设置
  res.setHeader('X-Robots-Tag', 'index,follow')
  next()
})
```

## 5. 内部链接生成

### 模板渲染检查
- [ ] 确保新页面至少有一个内链指向
- [ ] 检查分页组件的标记：
  ```html
  <link rel="next" href="...">
  <link rel="prev" href="...">
  ```

## 6. 性能优化

### 数据库查询优化
- [ ] 检查慢查询日志
- [ ] 确认缓存策略合理性：
  ```typescript
  // 缓存示例
  const cacheKey = `product:${id}`
  let product = await redis.get(cacheKey)
  if (!product) {
    product = await db.product.findUnique({ where: { id } })
    await redis.set(cacheKey, JSON.stringify(product), 'EX', 3600)
  }
  ```

### 响应时间监控
- [ ] 确保页面响应时间 < 500ms
- [ ] 监控并处理 5xx 错误

## 7. 权限控制

### 访问控制检查
- [ ] 确认匿名访问（包括 Googlebot）不会被拦截
- [ ] 检查防爬虫规则是否合理

### 示例配置
```typescript
// 中间件检查
app.use((req, res, next) => {
  const isGooglebot = req.headers['user-agent']?.includes('Googlebot')
  if (isGooglebot) {
    // 确保 Googlebot 可以正常访问
    return next()
  }
  // ...其他逻辑
})
```

## 8. CDN/缓存配置

### CDN 设置检查
- [ ] 确认 CDN 配置不会影响爬虫访问
- [ ] 验证缓存策略合理性

### 部署脚本检查
- [ ] 确保静态资源和动态页面的缓存策略不冲突

## 快速验证方法

### 命令行检查
```bash
# 检查 HTTP 响应头
curl -I https://yourdomain/page

# 检查页面内容
curl -A "Googlebot" https://yourdomain/page
```

### Google Search Console 验证
- 使用"URL 检查"功能验证页面可访问性
- 监控抓取错误报告

## 注意事项

1. 定期检查 Google Search Console 的抓取错误报告
2. 监控服务器错误日志，特别关注 Googlebot 访问时段
3. 确保开发环境和生产环境的 SEO 相关配置一致
4. 建立自动化测试以验证 SEO 关键配置

---

> 本文档会随项目发展持续更新，如有新的 SEO 相关问题和解决方案，请及时补充。 