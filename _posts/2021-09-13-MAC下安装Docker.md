---
layout: post
title: MAC下安装Docker
date: 2021-9-13
categories: blog
tags: [Docker,学习笔记]
description: 诶嘿～
---   
# 安装  
## 使用Homebrew安装  
macOS 我们可以使用 Homebrew 来安装 Docker。  
Homebrew 的 Cask 已经支持 Docker for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装：  
```
brew install --cask --appdir=/Applications docker
```  
安装完成后，载入Docker app后，点击next，出现询问MAC登陆密码的对话框，输入即可。之后会弹出一个 Docker 运行的提示窗口，状态栏上也有有个小鲸鱼的图标（![](https://cdn.jsdelivr.net/gh/YoukiAkito/blog-resource@1.1/img/docker-logo.png)）。  

---  
## 手动下载安装  
如果需要手动下载，请点击以下链接下载 [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)  
下载完成后，双击下载的`.dmg`文件，然后将鲸鱼图标拖拽到`Application`文件夹即可  

之后点击顶部状态栏中的鲸鱼图标后会弹出操作菜单  

启动终端后，可以通过以下命令查看安装的Docker版本
```
docker --version
```  