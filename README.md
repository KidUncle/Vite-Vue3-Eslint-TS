

## 增加 **husky**

### **husky** 

它的主要作用就是关联git的钩子函数，在执行相关git hooks时进行自定义操作，比如在提交前执行eslint校验，提交时校验commit message等等。

### **Install**

husky官网推荐使用自动初始化命令，因为我们就按照官网推荐的方式进行安装，以npm为例
```
npx husky-init && npm install
```  
执行完成后，项目根目录会多出来 .husky 文件夹。
内部的_文件夹我们在此无需关心，pre-commit文件便是在git提交前会执行的操作  

### **配置**

我们想要在提交前执行eslint校验代码，因此修改husky的pre-commit文件即可。我们在文件中添加如下代码
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

eslint . --ext .js,.ts,.vue --fix #++ 校验所有的.js .ts .vue文件，并修复可自动修复的问题
git add . #++ 用于将自动修复后改变的文件添加到暂存区
exit 1 #++ 终止命令，用来测试钩子
```   
此时提交代码执行commit是可以看到已经进入了pre-commit文件执行命令。
```
git commit -m '测试'
```  
但是可能会报错需要全局的eslit，执行以下代码
```
npm i eslint -g
// 用于验证 eslint 是否全局安装成功
eslint -v 
// 如果报错 可能是 node 环境配置问题 可以通过重新安装 node 解决问题
// 也有可能 powershell 不支持，推荐在 git bash 环境下执行提交代码
// eslint --init 推荐使用 npx eslint --init 方式
```  

### **思考**

通过配置husky，我们已经实现了在提交前对代码进行检查。但是eslint配置的是 eslint . --ext .js,.ts,.vue --fix，检查所有的js、ts、vue文件，随着项目代码越来越多，每次提交前校验所有代码显然是不现实的。所以需要一个办法每次只检查新增或修改的文件。

## ** 添加lint-staged
lint-staged的作用就是对暂存区的文件执行lint，可以让我们每次提交时只校验自己修改的文件。
```
npm install lint-staged --save-dev
```
