var express = require('express');
var api = require('./control/api');
var bodyParser = require('body-parser');
var https = require('https');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


app.use(express.static('resource'));
app.use(express.static('resource/images'));

app.get('./resource/js/:cssfile',function (req, res){
	res.sendFile(path.join(__dirname,'resource/js',req.params.cssfile));
});
app.get('./resource/css/:cssfile',function (req, res){
	res.sendFile(path.join(__dirname,'resource/css',req.params.cssfile));
});
app.get('./css/:cssfile',function (req, res){
	res.sendFile(path.join(__dirname,'resourece/css',req.params.cssfile));
});


var APIRouter = express.Router();
app.use('/api', APIRouter);
APIRouter.post("/login", api.Login);
APIRouter.post("/getPageData", api.GetPageData);

var FileRouter = express.Router();
app.get('/', function (req, res) {
  	res.sendFile(path.join(__dirname,'view/login.html'));
}); 



app.use('/',FileRouter);
app.use('/', APIRouter);
app.listen(8080);
console.log("Server Running on locahost @ port 8080");
