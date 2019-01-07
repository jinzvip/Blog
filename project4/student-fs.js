
/*
 *student.js
 *数据操作文件模块
 *职责：操作文件中的数据，不关心业务
 *
 *这里是学习Node的精华部分	
 */
var fs=require('fs')
var dbPath='./db.json'
 /*
 *获取所有学生列表	
 */
 //callback中的参数
 //	第一个参数是 err
 //		成功：null
 //		失败： 错误对象
 //	第二个参数是 结果
 //		成功：数组
 //		错误：undefined

exports.find=function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err ) {	return callback(err) }

		callback(null,JSON.parse(data).students)
	})
}
exports.findById=function( id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err ) {	return callback(err) }
		var students = JSON.parse(data).students
		var ret= students.find(function(item){
			return item.id===parseInt(id)
		})
		callback(null,ret)
	})
 }
 /*
 *添加保存学生	
 */
exports.save=function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err ) {	return callback(err) }

		var students = JSON.parse(data).students 
		//处理id唯一，不重复
		student.id=students[students.length-1].id + 1
		//把用户对象保存到数组中
		students.push(student)
		//把对象数据转换成字符串
		var fileData = JSON.stringify({
			students: students
		})
		//fileDate是字符串
		fs.writeFile(dbPath,fileData,function(err){
			if(err) { return callback(err)  }
			//成功时，callback第一个参数是null
			callback(null)
		})
	})
}
 /*
 *更新学生(修改)	
 */
exports.updateById=function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err ) {	return callback(err) }

		var students = JSON.parse(data).students
		//id统一改为数字类型
		student.id = parseInt(student.id)
		//es6中一个数组方法：find，接受一个函数作为参数
		//该方法主要应用于查找第一个符合条件的数组元素。它的参数是一个回调函数。
		//在回调函数中可以写你要查找元素的条件，当条件成立为true时，返回该元素。
		//如果没有符合条件的元素，返回值为undefined
		var stu = students.find(function(item){
			return item.id === student.id
		})
		//stu是students数组中要寻找的id的对应对象
		//遍历拷贝对象（把传进来的student的值给stu）
		for (var key in student){
			stu[key]=student[key]
		}
		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})
		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err) { return callback(err)  }
			//成功时，callback第一个参数是null
			callback(null)
		})
	})
}	
 /*
 *删除学生	
 */
 exports.deleteById=function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err ) {	return callback(err) }

		var students = JSON.parse(data).students 
		//es6中findIndex 方法专门用来根据条件查找元素的下标
		var deleteId = students.findIndex(function(item){
			return item.id===parseInt(id)
		})
		students.splice(deleteId,1)
		//把对象数据转换成字符串
		var fileData = JSON.stringify({
			students: students
		})
		//fileDate是字符串
		fs.writeFile(dbPath,fileData,function(err){
			if(err) { return callback(err)  }
			//成功时，callback第一个参数是null
			callback(null)
		})
	})
}