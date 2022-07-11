const express = require('express');
var bodyParser = require('body-parser')
var mongo = require('mongodb');
const app = express();
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dvir:dvirko1221@data.my748.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TOMATACTI_DB");
    dbo.collection("person").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });

app.get('/', (res) => {
    const user = {
        name: 'Dvir'
       }
       res.sendStatus(200)
});
    
app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});
    
app.listen(3000);