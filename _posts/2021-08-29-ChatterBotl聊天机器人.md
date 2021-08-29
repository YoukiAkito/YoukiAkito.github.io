---
layout: post
title: ChatterBot聊天机器人
date: 2021-8-28
categories: blog
tags: [python,机器学习,学习笔记]
description: 诶嘿～
---    

# 基于ChatterBot的聊天机器人  
> 前言：因为作者太无聊了所以想做个自动问答系统来消遣时间~~才不是没朋友~~，也就是常说的聊天机器人  


---  
## 关键点  
1. 句意理解  
   系统接收到一句话，需要先通过语法分析，语义分析等来理解该句子，这样才能更好的给出回答。  
2. 文本信息摘取  
   系统需要有自己的语料库、知识库或者相关内容，并从中抽取出相应的回答。  
3. 知识推理  
   这个是更高一层的要求，系统应该可以通过上下文，或者接收到的句子的语义，通过知识推理的手段获取到知识库中不存在的答案。  
---  
## 可用技术栈
基于以上几点，可用基于现有的一些算法来训练自己的模型，也可用通过开源的框架来搭建。这里我采用的是基于开源框架ChatterBot来实现的方法  
### 基于ChatterBot实现  
ChatterBot 是一个功能强大的，基于 Python 的聊天机器人框架  
其 GitHub 地址为：<https://github.com/gunthercox/ChatterBot/tree/master>   
官方文档为：<https://chatterbot.readthedocs.io>    
---   
## 实战
### 1.获取语料
中文聊天语料这一块，我选择了网上大神整理的资料，这里附上github链接：  
<https://github.com/codemayq/chinese_chatbot_corpus>   
其中语料的使用大神有写了详尽的文档，务必仔细阅读后使用。  
> 这里笔者遇到了一个比较奇怪的问题，使用pycharm运行文档里的main.py可以顺利进行语料转换，然而直接使用命令行会报错，暂时不清楚原理  


### 2.使用Google Colab训练  
1. 上传语料到Colab  
> 这里我采用的是将下载到的语料上传到Google Drive，然后挂载Google Drive硬盘到Colab来调用  


> 注意：请务必选择GPU硬件加速以加快训练速度，否则训练时间过长可能导致异常退出  


1. 在Colab上安装ChatterBot  
```
!pip install chatterbot                //注意：感叹号是必须的
!pip isntall chatterbot-corpus         //注意：感叹号是必须的  
```  
3. 创建一个ChatBot  
```
from chatterbot import ChatBot
from chatterbot.trainrs import ListTrainer
chatbot = ChatBot("susu")
trainer = ListTrainer(chatbot) 
```  
4. 载入语料  
```
with open('xiaohuangji.tsv', encoding='utf-8') as f:
  data = f.read().replace('\t', '\n')
print(data[:100])
```  
5. 开始训练  
 ```
trainer.train(data)
```  
> 这一步根据语料的数据量大小时间有长有短，使用GPU硬件加速能大幅缩短训练时间  


等待训练完成后，记得将生成的db.sqlite3文件下载到本地  
