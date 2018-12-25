# git 操作文件相关方法：

## 1.创建文件夹 mkdir blog
## 2.进入文件夹内 cd blog
## 3.把github上面的仓库克隆到本地 git clone https://github.com/jinzvip/blog
## 4.再次进入blog （blog/blog）
## 5.查看本地修改了多少文件 git status
## 6.把项目文件夹下面的文件都添加进来  git add .
## 7. git pull
## 8.提交说明，准备提交暂存区中的更改的已跟踪文件 git commit -m "blog"
## 9.更新到远程服务器上 git push

# 使用git删除github中的文件

## 查询目录dir 
## 删除文件夹（js）git rm -r --cached js
## 提交,添加操作说明 git commit -m 'remove'
## 将本次更改更新到GitHub项目上去 git push -u origin master

