const fs = require('fs')

fs.readFile('./NODEJS/我的/1/素材/成绩.txt','utf-8',function(err,datastr){
    if(err){
        console.log(err);
    }
    else{
        let data = datastr.split(" ")
        let str = ""
        //分割 得到数组


        data.forEach((p)=>{
            let index = p.indexOf("=")
            //找到=位置
            str += p.slice(0,index) + ":" + p.slice(index+1,p.length) + '\n'
            //重新组合
        })



        fs.writeFile('./NODEJS/我的/1/素材/成绩ok.txt',str,'utf-8',function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("成功写入"+str);
            }
        })
    }
})

            // let str = 'test'
            // fs.writeFile('./NODEJS/我的/1/素材/写入测试.txt',str,'utf-8',function(err){
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         console.log('ok');
            //     }
            // })