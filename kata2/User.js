var eventEmitter = require('events');
var util = require('util');
var fs = require('fs');
var zlib = require('zlib');
var INDEX = 0;

function User(){
	eventEmitter.call(this);
}

util.inherits(User, eventEmitter);

User.prototype.save = function(user) {
	var options = {
		flags: 'a',
		defaultEncoding: 'utf8'
	};
	var writeStream = fs.createWriteStream('database.txt', options);
	writeStream.write(JSON.stringify(user)+'\n');
	writeStream.end();
	this.emit('save', user, INDEX++);
}

User.prototype.compress = function(){
	var r = fs.createReadStream('database.txt');
	var z = zlib.createGzip();
	var w = fs.createWriteStream('database.txt.gz');
	w.on('pipe', function(){
		console.log('Compressing...');
	})
	r.pipe(z).pipe(w).on('finish', function(){
		console.log('Done compressing');
	});
}

User.prototype.onSave = function(callback){
	this.on('save', callback);
}

User.prototype.onDelete = function(callback){
	this.on('delete', callback);
}

User.prototype.onError = function(callback){
	this.on('error', callback);
}

User.prototype.all = function() {
	var options = { 
		flags: 'r',
		encoding: null,
		fd: null,
		mode: 0o666,
	 	autoClose: true
	}
	var readStream = fs.createReadStream('database.txt', options);
	readStream.pipe(process.stdout);
}


module.exports = User;