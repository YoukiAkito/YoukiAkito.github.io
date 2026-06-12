# Hugo 博客

基于 Hugo 构建的静态博客，简约极简风格，中文内容，部署在 GitHub Pages。

🔗 **访问地址**：[https://YoukiAkito.github.io](https://YoukiAkito.github.io)

## 快速开始

### 本地预览（需安装 Hugo）

```bash
# 安装 Hugo（macOS）
brew install hugo

# 安装 Hugo（Windows，使用 Scoop）
scoop install hugo-extended

# 启动本地服务器
hugo server -D
```

访问 [http://localhost:1313](http://localhost:1313) 预览效果。

### 切换主题

项目内置两个 Hugo 主题：

- `card-home`：卡片式个人主页风格
- `paper-reading`：日系纸张阅读风格

在 `hugo.toml` 中修改 `theme` 即可切换：

```toml
theme = "card-home"
# 或
theme = "paper-reading"
```

两个主题都内置 `Light / Dark` 明暗模式按钮，访问页面后可在顶部导航内直接切换。浏览器会记住上次选择的模式。

### 写新文章

在 `content/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: 2026-05-26
description: "文章简介"
tags: ["标签1", "标签2"]
draft: false
---

正文内容...
```

### 发布

推送到 `main` 分支，GitHub Actions 会自动构建并部署：

```bash
git add .
git commit -m "新增文章：xxx"
git push origin main
```

## 目录结构

```
blog/
├── .github/workflows/deploy.yml  # 自动部署
├── content/
│   ├── posts/        # 博客文章
│   └── about/        # 关于页面
├── themes/
│   ├── card-home/    # 卡片式个人主页主题
│   └── paper-reading/ # 日系纸张阅读主题
└── hugo.toml         # 配置文件
```

## 部署配置

本项目使用 GitHub Actions 自动部署，需要在仓库设置中：

1. 进入 `Settings` → `Pages`
2. Source 选择 **GitHub Actions**
3. 推送代码后自动触发部署
