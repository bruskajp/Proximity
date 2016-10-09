var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

removeAll();
createTopic("NY","clowns");
createTopic("NY","clown");
decNum("NY","clowns");
addMessage("NY","clowns","the monster rises at 101");
/*getPreviousMessages("NY","clowns",function(data){
	console.log(data);
	return(data);
});*/
getAvalible("NY",function(data){
	console.log(data);
	return(data);
});
topicExists("NY", "clowns", function(data){
	if(data.length == 0){
		console.log("false");
		return false;
	}else{
		console.log("true");
		return true;
	}
});



function addMessage(loc,topic,message){
	//this function takes the stuff passed in and shoves it into the mongoDB database
	//in a single json object
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.update(
			{TOPIC: topic, LOCATION: loc},
			{$set: {MESSAGES: message}},
			true,
			false
		);
		db.close();
	});
}

function removeAll(){
	MongoClient.connect(url, function(err,db){
	 var collection = db.collection('documents');
	 collection.removeMany({});
	 db.close();
	});
}

function getJsonArray(loc,topic,callback){
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.find({"TOPIC":topic,"LOCATION":loc}).toArray(function(err,docs){
			callback(docs[0]);
		});
		db.close();
	});
}

function createTopic(loc, topic){
	MongoClient.connect(url,function(err,db){
		var collection = db.collection('documents');
		stuffs = {LOCATION:loc,TOPIC:topic,USERNUM:1,MESSAGES:null};
		collection.insertOne(stuffs);
		db.close();
	});
	
}

function getPreviousMessages(loc,topic,callback){
	MongoClient.connect(url,function(err,db){
		var collection = db.collection('documents');
		collection.find({LOCATION:loc, TOPIC:topic}).toArray(function(err,docs){
			console.log(docs);
			console.log("getPrev");
			if(docs.length!=0){
				console.log(docs[0]);
				callback(docs[0].MESSAGES);
			}
		});
	 db.close();
	});
}

function getAvalible(loc, callback){//returns all topics
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.find({LOCATION: loc}).toArray(function(err,docs){
			console.log(docs[0]);
			callback(docs[0]);
		});
		db.close();
	});
}

function getDefaultTopics(callback){
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.find().toArray(function(err,docs){
			console.log(docs);
			callback(docs);
		});
		db.close();
	});
}//duh

function topicExists(loc,topic,callback){//checks if topic's real,returns 1 if real
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.find({LOCATION: loc, TOPIC: topic}).toArray(function(err,docs){
			callback(docs);
		});
		db.close();
	});
}
function decNum(loc,topic){
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.update(
			{TOPIC: topic, LOCATION: loc},
			{$inc: {USERNUM: -1}}
		);
		db.close();
	});
}//decrement number of users
function incNum(loc,topic){
	MongoClient.connect(url, function(err,db){
		var collection = db.collection('documents');
		collection.update(
			{TOPIC: topic, LOCATION: loc},
			{$inc: {USERNUM: 1}}
		);
		db.close();
	});
}//increses number of users subscribe to a topic by onerror
function getNum(loc,topic,callback){
	MongoClient.connect(url,function(err,db){
		var collection = db.collection('documents');
		collection.find({LOCATION:loc, TOPIC:topic}).toArray(function(err,docs){
			console.log(docs);
			callback(docs[0].USERNUM);
		});
	 db.close();
	});
}//returns number in topics