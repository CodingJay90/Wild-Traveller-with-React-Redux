const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
// app.use(express.json({limit: '25mb'}))
// app.use(express.urlencoded({limit: '25mb', parameterLimit: 50000, extended: true}))

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));

app.use(cors());

mongoose
  .connect(
    "mongodb://localhost/wild_traveller_project_2",
    {useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Mongodb connected successfully"));

//Import Routes
const locationRoute = require('./routes/locationRoute')
const commentRoute = require('./routes/commentRoute')
const authRoute = require('./routes/authRoute')

app.use(function (req, res, next) {
  res.user = req.user
  next();
});

app.use('/location', locationRoute)
app.use('/location/:id/comment', commentRoute)
app.use('/auth', authRoute)

app.listen(5000, () => console.log("server running on port 5000"));
