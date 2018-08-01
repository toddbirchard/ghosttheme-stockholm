var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://todd:a9tw3rjw@hackerdata-gktww.gcp.mongodb.net/admin";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("jira").collection("hackersandslackers");
   // perform actions on the collection object
   client.close();
});
