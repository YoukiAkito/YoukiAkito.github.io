---
title: "Hugo 博客搭建记录"
date: 2026-05-26
description: "记录这个博客从零搭建、部署到 GitHub Pages 的全过程。"
tags: ["技术", "Hugo", "GitHub Pages"]
draft: false
---

这篇文章记录一下博客搭建的过程，供自己日后回顾，也希望对同样想搭建静态博客的人有所帮助。

## 技术选型

最终选择了 **Hugo + GitHub Pages** 的组合：

- **Hugo**：Go 语言编写，构建速度极快，无需复杂的运行时环境
- **GitHub Pages**：免费静态托管，与代码仓库无缝集成
- **GitHub Actions**：自动化 CI/CD，推送代码后自动构建部署

## 目录结构

```
blog/
├── content/
│   ├── posts/        # 文章
│   └── about/        # 关于页面
├── layouts/          # 自定义模板
├── static/           # 静态资源
├── hugo.toml         # 配置文件
└── .github/
    └── workflows/
        └── deploy.yml  # 自动部署脚本
```

## 部署流程

1. 本地编写 Markdown 文章
2. 推送到 `main` 分支
3. GitHub Actions 自动触发，调用 Hugo 构建
4. 构建产物推送到 `gh-pages` 分支
5. GitHub Pages 自动发布

整个流程几分钟内完成，非常顺畅。

## 写作工作流

新建文章只需在 `content/posts/` 目录下创建 `.md` 文件，在文件头部写 Front Matter：

```
---
title: "文章标题"
date: 2026-05-26
tags: ["标签1", "标签2"]
draft: false
---

正文内容...
```

就这么简单。
