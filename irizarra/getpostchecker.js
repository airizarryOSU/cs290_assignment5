var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('viewengine', 'handlebars');
app.set('port', 4444);

//Upon receiving a GET request
//"Render" a page that has a H1 tag displaying "GET Request Received"
app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get.handlebars', context);
});

//Upon receiving a POST request
//"Render" a page that has a H1 tag displaying "POST Request Received"

app.post('/', function(req,res){
  var uParams = [];
  // URL query string 
  //console.log(req.query);
  for (var p in req.query){
    uParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.urlList = uParams;
  var bParams = [];
  //request body
  for (var p in req.body){
    bParams.push({'name':p,'value':req.body[p]})
  }
  context.bodyList = bParams;
  res.render('post.handlebars', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404.handlebars');
});
  
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500.handlebars');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});