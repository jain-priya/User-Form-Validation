const express = require("express");
const app = express();
const route = require("./routes/route");
const bodyParser = require("body-parser");
var port = process.env.PORT || 7777;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', route);
app.use(express.static("public"));

var server = app.listen(port, function () {
    console.log("Server Start....");
})
