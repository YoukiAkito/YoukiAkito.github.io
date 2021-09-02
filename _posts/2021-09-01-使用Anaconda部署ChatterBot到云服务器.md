---
layout: post
title: 使用Anaconda部署ChatterBot到云服务器
date: 2021-9-01
categories: blog
tags: [Anaconda,ChatterBot,学习笔记]
description: 诶嘿～
---   

# 部署训练好的ChatterBot机器人到云服务器
## 1.安装ChatterBot
首先，进入Anaconda环境  
```
conda activate # 进入conda环境 出现(base)则说明安装成功
conda deactivate # 退出conda环境
```  
然后安装ChatterBot  
```
pip3 install chatterbot
pip3 install chatterbot-corpus
```  
这样我们部署服务的前置条件就准备好了  
## 2.部署成服务  
先写个python文件，名字随意  
```
from chatterbot import ChatBot

bot = ChatBot(
    'susu',
    database_uri='sqlite:///db.sqlite3'
)
 
print('Type something to begin...')
 
while True:
    try:
        user_input = input()

        bot_response = bot.get_response(user_input)

        print(bot_response)

    # Press ctrl-c or ctrl-d on the keyboard to exit
    except (KeyboardInterrupt, EOFError, SystemExit):
        break
```   
然后把训练完的`db.sqlite3`文件上传到云服务器，之后在Anaconda环境下运行刚才写好的python文件  
```
python3 test.py
```  
等待完成后显示`Type something to begin...`后就可以开始对话了  
> 注意：一问一答哦