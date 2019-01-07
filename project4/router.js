var fs= require('fs')

//Express 提供了一种更好的方法，专门用来包装路由的
/*
 *router.js路由模块
 *职责：
 *	处理路由
 *	根据不同的请求方法+请求路径设置具体的请求处理函数
 * 	模块职责要单一，不要乱写
 *	提升开发效率
 */
var express = require('express')
var Student = require('./student')
//1 创建一个路由容器
var router=express.Router()

//2 把路由都挂载到router路由容器中
router.get('/students',function(req,res){
			//readFile第二个参数可选，utf8告诉它把读取到的文件直接按照utf8编码
			//也可以通过data.toString()方法变成字符串（data是二进制数据，）
		/*	fs.readFile('./db.json','utf8',function(err,data){
				if( err ) {  return res.status(500).send('server error')  }

				//这里data是字符串，通过parse转成对象：JSON.parse(data)，
				var students=JSON.parse(data).students
				
				res.render('index.html',{
				fruits: [
					'苹果',
					'香蕉',
					'橘子'
				],
				students: students 
			})	*/
			Student.find(function(err,students){
				if( err ) {  return res.status(500).send('server error')  }

				res.render('index.html',{
					fruits: [
						'苹果',
						'香蕉',
						'橘子'
					],
					students: students 
				})
			})
})
/*
* 渲染添加学生页面(点击添加学生后，执行跳转到new.html)
*/
router.get('/students/new',function(req,res){
	res.render('new.html')	
})
/*
* 处理添加学生(new.html提交后，执行跳转到首页)
*/
router.post('/students/new',function(req,res){
	//先读取出来，转成对象--往对象push数据--对象转为字符串--写入文件
	//console.log(req.body)
	/*Student.save(req.body,function(err){
		if (err) { return res.status(500).send('server error') }
		res.redirect('/students')
	})*/
	new Student(req.body).save(function(err){
		if (err) { return res.status(500).send('server error') }
		res.redirect('/students')
	})
})
/*
* 渲染编辑学生页面(点击编辑后，执行跳转到edit.html)
*/
router.get('/students/edit',function(req,res){
	/*
	Student.findById(parseInt(req.query.id),function(err,student){
		if(err) {
			return res.status(500).send('server error')
		}
		res.render('edit.html',{
			student: student
		})
	})*/
	
	Student.findById(req.query.id.replace(/"/g,''),function(err,student){
		if(err) {
			console.log(err)
			return res.status(500).send('server error')
		}
		res.render('edit.html',{
			student: student
		})
	})	
})
/*
* 处理编辑学生(edit.html提交后，执行跳转到首页)
*/
router.post('/students/edit',function(req,res){
	//1 获取表单数据 req.body
	//2 更新 Students.update( )
	//3 发送响应
	//console.log(req.body.id.replace(/"/g,''))
	
	var id = req.body.id.replace(/"/g,'')
	Student.findByIdAndUpdate(id,req.body,function(err){
		if (err) { return res.status(500).send('server error') }
		res.redirect('/students')
	})
})
/*
* 处理删除学生
*/
router.get('/students/delete',function(req,res){
	//1 获取要删除的id
	//2 根据id执行删除操作
	//3 根据删除结果发送响应数据
	//console.log(req.query.id)
	var id = req.query.id.replace(/"/g,'')
	Student.findByIdAndRemove(id,function(err){
		if (err) { return res.status(500).send('server error') }
		res.redirect('/students')	
	})
})

//3 把router导出
module.exports=router

//这样也不方便
/*
module.exports=function(app){

	app.get('/students',function(req,res){
			//readFile第二个参数可选，utf8告诉它把读取到的文件直接按照utf8编码
			//也可以通过data.toString()方法变成字符串（data是二进制数据，）
			fs.readFile('./db.json','utf8',function(err,data){
				if( err ) {  return res.status(500).send('server error')  }

				//这里data是字符串，通过parse转成对象：JSON.parse(data)，
				//对象再.students,结果就是数组了
				var students=JSON.parse(data).students
				
				res.render('index.html',{
				fruits: [
					'苹果',
					'香蕉',
					'橘子'
				],
				students: students 
			})
		})
	})

	app.get('/students/new',function(req,res){
		
	})
}
*/