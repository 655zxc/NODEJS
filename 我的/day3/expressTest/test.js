// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()

// 3.设置方法
app.get('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    
    // res.send({ name: 'zs', age: 20, gender: '男' })
    res.send(req.query)
  })



// 4.开启
app.listen(8100,()=>{
    console.log("已开启");
})