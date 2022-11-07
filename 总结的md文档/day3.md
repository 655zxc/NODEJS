2022.10.12
### 1.模块的加载机制
#### 1.1 缓存
模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次(require会执行一次模块的代码)。 
注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。
#### 1.2 内置模块的加载机制
内置模块的加载优先级最高。 例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。
#### 1.3 自定义模块的加载机制
使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../ 这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。 

同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：
- 按照确切的文件名进行加载 
-  补全 .js 扩展名进行加载 
-  补全 .json 扩展名进行加载 
-  补全 .node 扩展名进行加载 
-  加载失败，终端报错
#### 1.4 第三方模块的加载机制 
如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。 

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。 例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：
- C:\Users\itheima\project\node_modules\tools 
-  C:\Users\itheima\node_modules\tools 
-   C:\Users\node_modules\tools 
-   C:\node_modules\tools
#### 1.5 按照目录加载

当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：
- 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口 
- 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。 
- 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'

总结:
require('XX')  内置模块(XX是一个模块名)
require('./XXX')  自定义模块(XX是一个文件名)
require('XX')  第三方模块(XX是一个文件夹名)
require('./XXX')  目录加载(XX是一个文件夹名)

### 2.EXPRESS

Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。作用和 Node.js 内置的 http 模块类似。

因此，使用时需要在项目中安装 ，npm i express

#### 2.1 创建服务器

```js
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()
// 3.开启
app.listen(8100,()=>{
    console.log("已开启");
})
```

#### 2.2 请求

```
app.get或post('/路径', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    res.send({ name: 'zs', age: 20, gender: '男' })
  })
```

req.query获取参数