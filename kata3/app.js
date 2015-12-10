var http = require('http');
var url = require('url');
var router = require('./router');

function GET(req, res) {
	res.writeHead(200);
	res.send(user.all());
}

function POST(req, res) {
	if(req.body){
		user.save(req.body.user);
		res.send(200);
	}else{
		res.send(500);
		res.send('Error, wrong format');
	}
}

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "application/json"});
  var urlParsed = url.parse(request.url);
  router.match(urlParsed.pathname, req, res);
});

server.listen(9000, function(){
	console.log("Server running at http://localhost:9000/");
});