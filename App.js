const express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const cors = require('cors');
const app = express();
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var MongoClient = mongo.MongoClient;
var url = "mongodb+srv://dvir:dvirko1221@data.my748.mongodb.net/?retryWrites=true&w=majority";

app.get("/image", urlencodedParser, (req, res) => {
    var requestSettings = {
        url: 'https://www.google.com/images/srpr/logo11w.png',
        method: 'GET',
        encoding: null
    };

    req(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
});

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