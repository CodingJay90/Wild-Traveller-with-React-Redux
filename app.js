const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')
const path = require('path')

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

const CONNECTION_URL =
  "mongodb+srv://CodingJay90:Farmanimals1@cluster0.sdunn.mongodb.net/wild_traveller?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb connected successfully"))
  .catch(err => console.log(err));

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running on port " + port));
