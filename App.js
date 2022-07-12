const express = require('express');
var bodyParser = require('body-parser');
const request = require('request');
var mongo = require('mongodb');
const cors = require('cors');
const app = express();
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var MongoClient = mongo.MongoClient;
var url = "mongodb+srv://dvir:dvirko1221@data.my748.mongodb.net/?retryWrites=true&w=majority";

app.get('/image', (req, res) => {
    res.sendFile(__dirname+'./img/IMG_0280.JPG');
})


app.get('/', urlencodedParser, (req, res) => {
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TOMATACTI_DB");
        dbo.collection("person").find({}, { projection: { _id: 0} }).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
          });
        });
});
   
app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});
    
app.listen(3000);