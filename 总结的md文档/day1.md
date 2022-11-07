2022.10.11
### 1.浏览器中js组成部分
核心语法(循环,分支,变量,函数...) + webapi(BOM,DOM,)
### 2.为什么 JavaScript 可以在浏览器中被执行 / 可以操作 DOM 和 BOM
依靠的浏览器使用不同的 JavaScript 解析引擎 / 每个浏览器都内置了 DOM、BOM 这样的 API 函数
### 3.JavaScript 运行环境
① 浏览器是 JavaScript 的前端运行环境。
② Node.js 是 JavaScript 的后端运行环境。
③ 浏览器提供dom bom等api。nodejs提供fs path等api
因此Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API。
详见1.2.2图 1.1.5图，注意在浏览器和nodejs(两个不同的环境)都使用了V8引擎2
### 4.在 Node.js 环境中执行 JavaScript 代码
在终端中执行命令: node 文件.js
### 5.fs模块

用于读写文件的api

是由nodejs提供的api 使用时需要导入 const fs = require('fs')
fs.readFile 读
fs.writeFile 写

问题:在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径时,会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径,应当使用__dirname，它表示当前文件所处的目录

### 6.path模块

用于处理路径的api

const path = require('path')

path.join() 拼接字符串

path.basename() 获取路径的文件名

path.extname() 获取路径中的扩展名

