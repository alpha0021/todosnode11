var bodyParser = require ('body-parser');

var mongoose = require('mongoose');

//connect to the database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://test:test@ds153710.mlab.com:53710/test01');

//create a schema - this is like a blueprint

var  todoSchema = new  mongoose.Schema({
		item:String
});

//craete todo model

var Todo = mongoose.model('Todo' , todoSchema);

var itemOne = Todo({item:'say hi to piash vai'}).save(function(err){

	if (err) throw err;
	console.log('item saved');
});

var data =  [{item:"get millk"},{item:"make tea"},{item:"serve  to piash  vai"}];

var urlencodedParser =bodyParser.urlencoded({extended:false});

module.exports = function(app){

	app.get('/todo',function(req,res){
		res.render('todo',{todos:data});
	});


	app.post('/todo',urlencodedParser,function(req,res){
		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item',function(req,res){
		data = data.filter(function(todo){
			return todo.item.replace(/ /g,'-') !== req.params.item;
		});
		res.json(data);
	});


};