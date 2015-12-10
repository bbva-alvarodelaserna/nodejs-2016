var http = require('http');
var User = require('./User');
var user = new User();

function GET(req, res) {
	res.writeHead(200);
	res.send(user.all());
}

function POST(req, res) {

}

module.exports = {
	get: GET,
	post: POST
}