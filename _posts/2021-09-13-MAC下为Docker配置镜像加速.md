---
layout: post
title: MAC下为Docker配置镜像加速
date: 2021-9-13
categories: blog
tags: [Docker,学习笔记]
description: 诶嘿～
---   
> 由于众所周知的原因，国内拉去Docker镜像十分缓慢，我们可以通过配置国内的镜像加速来解决  

这里我是使用的是科大的镜像地址:`https://docker.mirrors.ustc.edu.cn/`  

除了科大意外，这里还推荐以下几个镜像地址：  
```
网易：https://hub-mirror.c.163.com/
阿里云：https://<你的ID>.mirror.aliyuncs.com
```  
其中，阿里云镜像地址需要到这里去获取：[阿里云镜像获取地址](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，登陆阿里云账号后，在左侧菜单选中镜像加速器就可以看到你的专属地址了  

> 当配置某一个加速器地址之后，若发现拉取不到镜像，请切换到另一个加速器地址。国内各大云服务商均提供了 Docker 镜像加速服务，建议根据运行 Docker 的云平台选择对应的镜像加速服务。  

我们可以多添加几个国内的镜像，如果有不能使用的，会切换到可以使用个的镜像来拉取。  

# macOS配置镜像加速  
对于mac用户，版本4.0.0(67817)，需要打开Docker Hub界面，然后在设置界面选中`Docker Engine`  
![](https://cdn.jsdelivr.net/gh/YoukiAkito/blog-resource@1.1/img/docker-setting.png)  
之后，在`"debug"`语句后，添加
```
"registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn/",
    "https://hub-mirror.c.163.com/"
  ]
```  
然后点击右下角Apply & Restart，镜像加速就配置完毕了。  
> 注意：在以下语句中
> ```
> "registry-mirrors": [
>     "https://docker.mirrors.ustc.edu.cn/",
>     "https://hub-mirror.c.163.com/"
>   ]
> ```  
> `[]`内需要配置几个镜像加速地址，就按照以上格式写几个  

# 检查镜像加速是否生效  
如果拉取镜像仍然十分缓慢，请手动检查加速器配置是否生效，在命令行执行 docker info，如果从结果中看到了如下内容，说明配置成功  
```
>>> docker info

Registry Mirrors:
    https://reg-mirror.qiniu.com
```  

