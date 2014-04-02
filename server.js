var express = require('express'),
    path = require('path'),
	html = require('html'),
    http = require('http');

var app = express();

var numVisits = 0;

function countNumberOfVisits()
{
	++numVisits;
}

function HowManyVisits()
{
	return (numVisits + " many visit(s).");
}

app.configure(function(){
	app.set('port', process.env.PORT || 8088);
	app.set('views', __dirname + '/views');
	app.set('ipAddr', process.argv[2]);
	app.set('baseuri', app.get('ipAddr') + ':' + app.get('port'));
	app.use(express.bodyParser());
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res){
	res.sendfile('views/index.html', {title: 'Home'}, function(err){
		if( err )
			console.log(err);
	});
	
	countNumberOfVisits();
	console.log(HowManyVisits()); 
});

console.log("Trying to start server on : " + app.get('baseuri'));

var server = http.createServer(app).listen(app.get('port'), process.argv[2] , function(){
	console.log("Server listening on : " + app.get('baseuri'));
});

