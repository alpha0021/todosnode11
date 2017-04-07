 var bodyParser = require ('body-parser');
 
 var mongoose = require('mongoose');
 
  //connect to the database
  mongoose.Promise = global.Promise;
  
 //-mongoose.connect('mongodb://test:test@ds153710.mlab.com:53710/test01');
 mongoose.connect('mongodb://test1:test1@ds155080.mlab.com:55080/todolist');
  
  //create a schema - this is like a blueprint
  
 var  todoSchema = new  mongoose.Schema({
 		item:String
 });
 
 //craete todo model
 
 var Todo = mongoose.model('Todo' , todoSchema);
 /*
 var itemOne = Todo({item:'say hi to piash vai'}).save(function(err){
 
 	if (err) throw err;
  	console.log('item saved');
  });
  */
 //var data =  [{item:"get millk"},{item:"make tea"},{item:"serve  to piash  vai"}];
var urlencodedParser =bodyParser.urlencoded({extended:false});
 
module.exports = function(app){
 
 	app.get('/todo',function(req,res){

 			//get data  from  mongodb and pass it to the view
 			Todo.find({} , function(err,data){
 				if (err) throw err;
 				res.render('todo',{todos:data});
 			});  //to  collect  all the items from the database

 		
 	});
 
 
 	app.post('/todo',urlencodedParser,function(req,res){
		//get data  from the mongo and pass it to  view
		var newTodo = Todo(req.body).save(function(err,data){
 			if (err) throw err;
 			res.json(data);

 		});
		//data.push(req.body);
 		//res.json(data);
    console.log("got the point");
 	});
 
 	app.delete('/todo/:item',function(req,res){
 		//delete item  from the mongodb 
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    	if (err) throw err;
    	res.json(data);
    });
    	/*
 		data = data.filter(function(todo){
 			return todo.item.replace(/ /g,'-') !== req.params.item;
 		});
 		res.json(data);*/
 	});
 
}; 
 