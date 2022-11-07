2022.10.11
### 1.http模块
什么是客户端、什么是服务器？ 在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器。

http模块是用来创建 web 服务器的模块，把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务
```
const http = require('http')
const server = http.createServer 创建
server.on(request,function(req,res)) 访问服务器时执行的回调函数
server.listen(8085, function） 启动服务器并执行回调

res是与服务端相关的 res.url res.method
req是与客户端相关的 res.end xiang

res.setHeader('Content-Type', 'text/html; charset=utf-8') 解决res.end中文乱码
```
### 2.模块化
#### 2.1.模块的分类
Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是： 

- 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等） 
- 自定义模块（用户创建的每个 .js 文件，都是自定义模块） 
- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）
#### 2.2.引入模块
```
require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用
注意，会执行被加载模块中的代码
```
#### 2.3.模块的作用域
在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问
#### 2.4.共享模块的内部成员
##### 2.4.1 module
在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息。
module有一个属性是exports，即module.exports
##### 2.4.2 module.exports
在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。
默认情况下， module.exports = {}
```js
//可以修改这个对象,或直接指向一个新的对象
const age = 20
// 向 module.exports 对象上挂载 username 属性
module.exports.username = 'zs'
// 向 module.exports 对象上挂载 sayHello 方法
module.exports.sayHello = function() {
  console.log('Hello!')
}
module.exports.age = age

// 让 module.exports 指向一个全新的对象
module.exports = {
  nickname: '小黑',
  sayHi() {
    console.log('Hi!')
  }
}
```
##### 2.4.3 exports
由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况 下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。
详见https://blog.csdn.net/louxinuo/article/details/119058495
#### 2.5 Node.js 中的模块化规范
CommonJS 规定： 
- 每个模块内部，module 变量代表当前模块。 
- module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。
- 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。
### 3.npm和包
#### 3.1 包
Node.js 中的第三方模块又叫做包。由于 Node.js 的内置模块仅提供了一些底层的 API， 包是基于内置模块封装出来的，提供了更高级、更方便的 API。
#### 3.2 安装包
npm i xx 安装包的最新版本
npm i xx@xx 安装指定版本
初次装包完成后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件。
node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。 package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。
#### 3.3 package.json
在项目根目录中，创建一个叫做 package.json 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码。 注意：今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。
创建项目时，在项目根目录npm init -y 创建package.json 
在后续执行npm i时，会自动向package.json里写入信息
package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包。
问题:
npm init生成package 
npm i生成node_modules 的文件夹和 package-lock.json 的配置文件
两个package有什么不同?
https://juejin.cn/post/7078233610683170824#comment
问题
开发依赖和生产依赖
#### 3.4 剔除node_modules后安装包
npm i ，会根据package.json的dependencies下载包
#### 3.5 卸载
npm uninstall 卸载包，并从 package.json 的 dependencies 中移除掉。
#### 3.6 devDependencies
如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。 与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。在包的官网会说用哪种方式比较好。
npm i xx -D 或 npm i xx --save-dev
#### 3.7.镜像
npm config get registry 查看镜像源
npm config set registry=xxx 设置镜像源

#### 3.8 包的分类
##### 3.8.1 项目包

那些被安装到项目的 node_modules 目录中的包，都是项目包。 项目包又分为两类，分别是：

- 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到） 
- 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

##### 3.8.2 全局包
在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。 
全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。
① 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。
② 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

#### 3.9 包的结构

在node_modules目录中的包

必须包含 package.json 这个包管理配置文件 ，且package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。

例如node_modules的moment的package.json的main是 "./moment.js",代表require这个包时，引入的是moment.js

#### 3.10 开发和发布包

略













