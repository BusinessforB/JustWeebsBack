require('dotenv').config({ path: "./config.env" });
const path = require('path');
const express = require('express');
const app = express();

const ObjectId = require("mongodb").ObjectId;
bodyParser = require('body-parser')
const cors = require("cors");
const { mongoClient } = require("../conn");





app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Config setup to parse JSON payloads from HTTP POST request body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Register the api routes
// HTTP endpoint to test health performance of service

// Create HTTP Server and Listen for Requests



app.delete('/api/delete/product/by/id/:id', async (req, res) => {


  let db_connect = await mongoClient()
  var quer = { _id: ObjectId(req.params.id) }
  db_connect.collection("Data").deleteOne(quer, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");

    res.json(obj);
  });

});

app.put('/api/update/clicks/:clicks/:id' , async (req,res) => {
  let db_connect = await mongoClient()
  var quer = { _id: ObjectId(req.params.id) }

  var newvalues = { $set: {clicks: req.params.clicks} };
  dbo.collection("Data").updateOne(quer, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });

})

app.post('/api/post/product', async (req, res) => {
var product = {
  img: req.body.img,
  anime: req.body.anime,
  description: req.body.description,
  link: req.body.link,
  title: req.body.title, 
  clicks : 0
};



let db_connect = await mongoClient()
db_connect.collection("Data").insertOne(product, function (err) {
  if (err) throw err;
  console.log("1 document inserted");

});

});


app.get('/api/get/product/by/id/:id', async (req, res) => {
  let db_connect = await mongoClient()
  var quer = { _id: ObjectId(req.params.id) }
  db_connect.collection("Data").findOne(quer, function (err, obj) {
    if (err) throw err;
    console.log("Got 1 document");

    res.json(obj);
  });
  
});

app.get('/api/get/product/by/anime/:anime', async (req, res) => {
  
  let db_connect = await mongoClient()
  var quer = { anime: req.params.anime }
  db_connect.collection("Data").find(quer).toArray(function (err, obj) {
    if (err) throw err;
    console.log("Got documents");

    res.json(obj);
  });
  
});
app.get('/api/get/All', async (req, res) => {
  
  let db_connect = await mongoClient()

  db_connect.collection("Data").find().toArray(function (err, obj) {
    if (err) throw err;
    console.log("Got documents");

    res.json(obj)
  });
  
});

app.listen(3000, async (req, res) => {
  // Start Kafka Producer

  console.log("Server is runing");
});