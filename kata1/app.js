var User = require('./User');
var user = new User();

user.onSave(function(user, userId){
	console.log('saved: ' + user.name + '(' + userId + ')');
});

user.onDelete(function(userId){
	console.log('deleted: ' + userId);
});

user.onError(function(error){
	console.log('Error on erase: ' + error);
});

var user1 = {
	"name": "Jane Doe",
	"occupation": "manager"
};
var user2 = {
	"name": "John Jacob",
	"occupation": "developer"
};

user.save(user1);
user.save(user2);

// KATA 1
var data = user.all();
console.log('Users:', data);

user.erase(1);
user.erase(20);

var data = user.all();
console.log('Users:', data);