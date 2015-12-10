var eventEmitter = require('events');
var database = [];
var util = require('util');

function User(){
	eventEmitter.call(this);
}

util.inherits(User, eventEmitter);

User.prototype.save = function(user) {
	database.push(user);
	this.emit('save', user, database.indexOf(user));
}

User.prototype.erase = function(userId) {
	if(database[userId]){
		database.splice(userId, 1);
		this.emit('delete', userId);
	}else{
		this.emit("error", "User not in database");
	}
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
	return database;
}


module.exports = User;