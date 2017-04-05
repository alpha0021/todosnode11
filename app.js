var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

app.set('view engine' , 'ejs');

app.use(express.static('./public 2'));

todoController(app);

app.listen(3000);
console.log('you are running  on port 3000');