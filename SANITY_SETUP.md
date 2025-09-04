# 🎨 Sanity Studio 配置指南

完整的 Sanity CMS 配置教程，让您快速上手内容管理功能。

## 📋 **配置步骤**

### **步骤 1: 获取 Sanity 项目信息**

1. **登录 Sanity.io**
   - 访问 [sanity.io](https://sanity.io) 并登录您的账户
   - 如果没有账户，请先注册

2. **选择您的项目**
   - 在仪表板中选择现有项目
   - 或创建新项目（项目名称建议：`digital-store`）

3. **获取项目 ID**
   - 在项目页面，点击 **Settings** → **API**
   - 复制 **Project ID**（格式类似：`abcd1234`）

4. **确认数据集名称**
   - 在同一页面查看 **Datasets**
   - 通常是 `production`（生产环境）或 `development`（开发环境）

5. **创建 API Token**
   - 在 **Settings** → **API** → **Tokens**
   - 点击 **Add API token**
   - 名称：`digital-store-token`
   - 权限：**Editor**（编辑权限）
   - 复制生成的 token（格式类似：`skXXXXXX...`）

### **步骤 2: 配置环境变量**

在项目根目录创建或编辑 `.env.local` 文件：

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-12"
SANITY_API_TOKEN="your-api-token-here"
```

**替换示例值：**
```bash
# 实际配置示例
NEXT_PUBLIC_SANITY_PROJECT_ID="abc123def"
NEXT_PUBLIC_SANITY_DATASET="production"  
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-12"
SANITY_API_TOKEN="skXXXXXXXXXXXXXXXXXXXXXXX"
```

### **步骤 3: 重启开发服务器**

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
pnpm dev
```

### **步骤 4: 访问 Studio**

访问：`http://localhost:3000/studio`

如果配置正确，您将看到 Sanity Studio 界面！

## 🛍️ **内容类型说明**

您的 Studio 现在包含以下内容类型：

### **1. Digital Product (数字产品)**
- 🛍️ 管理您的数字商品
- 包含：标题、描述、价格、文件信息、FAQ等
- 支持多语言和多币种定价

### **2. Product Category (产品分类)**  
- 📁 组织产品分类
- 包含：分类名称、图标、颜色主题
- 用于产品筛选和导航

### **3. Shop Settings (店铺设置)**
- ⚙️ 全局店铺配置
- 包含：店铺信息、店主资料、主题配色
- 社交分享设置和客户评价

### **4. 原有内容类型**
- 📝 Posts（博客文章）
- 📂 Categories（文章分类）
- 🚀 Projects（项目展示）
- ⚙️ Settings（网站设置）

## 📱 **Studio 使用指南**

### **创建第一个产品**

1. **点击 "Digital Product"**
2. **填写基本信息：**
   - 产品标题（必填）
   - Slug（自动生成）
   - 产品简介
   - 上传封面图片

3. **设置价格：**
   - USD 价格（必填）
   - 其他货币价格（可选）
   - 原价（用于显示折扣）

4. **文件信息：**
   - 文件数量
   - 总大小（如 "15.2 MB"）
   - 文件格式（如 PDF, ZIP）

5. **发布设置：**
   - 勾选 "Published" 使产品可见
   - 勾选 "Featured Product" 在首页展示

### **配置店铺信息**

1. **点击 "Shop Settings"**
2. **基本信息：**
   - 店铺名称
   - 店铺描述
   - 上传店铺 Logo 和横幅

3. **店主资料：**
   - 店主姓名
   - 个人简介
   - 头像照片
   - 社交媒体链接

4. **主题定制：**
   - 主色调（品牌色）
   - 辅助色
   - 字体选择

## 🔧 **高级配置**

### **自定义域名（可选）**

如果您使用自定义域名，需要在 Sanity 项目设置中添加 CORS 源：

1. 在 Sanity 项目中，前往 **Settings** → **API** → **CORS Origins**
2. 添加您的域名：
   - `http://localhost:3000`（开发环境）
   - `https://yourdomain.com`（生产环境）

### **Webhook 配置（可选）**

为了在 Sanity 内容更新时自动重新部署：

1. 在 **Settings** → **API** → **Webhooks**
2. 添加 webhook：
   - 名称：`Vercel Deploy`
   - URL：您的 Vercel webhook URL
   - 数据集：`production`
   - 触发器：选择所有相关内容类型

## 🚀 **开始使用**

现在您可以：

1. **📝 在 Studio 中创建和编辑内容**
   - 产品信息
   - 分类管理
   - 店铺设置

2. **🔄 内容自动同步到网站**
   - 产品页面自动更新
   - 分类筛选生效
   - 店铺信息实时显示

3. **📱 多端内容管理**
   - Web 端 Studio
   - 移动端 Sanity 应用
   - 团队协作编辑

## ❓ **常见问题**

### **Q: Studio 显示配置错误？**
A: 检查 `.env.local` 文件中的环境变量是否正确设置，确保没有多余的空格。

### **Q: 看不到新的内容类型？**  
A: 重启开发服务器，确保 schema 配置已加载。

### **Q: 图片上传失败？**
A: 检查 Sanity 项目的存储配额，免费版有限制。

### **Q: API Token 权限不足？**
A: 确保创建 Token 时选择了 "Editor" 权限。

### **Q: CORS 错误？**
A: 在 Sanity 项目设置中添加您的域名到 CORS Origins。

## 🎯 **下一步**

配置完成后，您可以：

- 🎨 **自定义 Studio 界面**：修改 `sanity.config.ts`
- 📊 **添加数据验证**：在 schema 中添加更多验证规则  
- 🔌 **集成第三方插件**：安装 Sanity 生态插件
- 📈 **设置分析追踪**：集成 Google Analytics

---

**🎉 恭喜！您的 Sanity Studio 现在已经完全配置好了！**

访问 `/studio` 开始管理您的数字商店内容吧！