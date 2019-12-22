// npm package to be used in the app

var express = require("express");
var path = require("path");


// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
// this way will help when we use heroku
var PORT = process.env.PORT || 7500;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router need to know that we are using app as server and we are using two router as path
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listener function to tell the server with port we using

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
