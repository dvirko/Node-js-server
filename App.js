import url from "./database.js";
const express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const cors = require('cors');
const app = express();
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var MongoClient = mongo.MongoClient;
app.get('/images', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TOMATACTI_DB");
        dbo.collection("images").find({}, { projection: { _id: 0} }).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
          });
        });
})


app.get('/person', urlencodedParser, (req, res) => {
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
    
app.listen(3000);