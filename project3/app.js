//*****************************************
//留言本项目2（使用express框架方法实现 get方法）
//*****************************************
var express=require('express')
var app=express()

//var template=require('art-template')
//设置开放public共享文件
app.use('/public/',express.static('./public/'))

//配置使用art-template模板引擎
//express-art-template是专门用来在express中把art-template整合到express中
app.engine('html',require('express-art-template'))

//express为response相应对象提供一个方法：render
//render默认不可使用，配置了模板引擎就可以
//res.render( 'html模板名',{模板数据} )            第一个参数不能写路径，默认 去项目views目录查找该模板文件

//如果希望修改默认的views视图渲染存储目录，可以使用 app.set('views',目录路径)

var comments=[
     {
     name: '张三1',
     message: '天气不错',
     dateTime: '2018-1-2'
     },
     {
     name: '张三2',
     message: '天气不错',
     dateTime: '2018-1-2'
     },
      {
     name: '张三3',
     message: '天气不错',
     dateTime: '2018-1-2'
     },
     {
     name: '张三4',
     message: '天气不错',
     dateTime: '2018-1-2'
     },
    {
     name: '张三5',
     message: '天气不错',
     dateTime: '2018-1-2'
     } 
]

app.get('/',function(req,res ){
      res.render('index.html',{
      	comments:comments
      })
})

app.get('/post',function(req,res ){
      res.render('post.html')
})

app.get('/pinglun',function(req,res ){
       var comment=req.query
       comment.dateTime='2018-12-1 10:22:12'
       comments.unshift(comment)
      
       //res.statusCode =302
       //res.setHeader('Location','/')
       res.redirect('/')    //redirect 重新定向
      
})

app.listen( 3000, function( ){
      console.log('running...')
})