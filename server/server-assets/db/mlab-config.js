var mongoose = require("mongoose");

var connectionString = "mongodb://music:music@ds012538.mlab.com:12538/vue-music";
var connection = mongoose.connection;

mongoose.connect(connectionString);

connection.on("error", err => {
  console.error("mlab Error: ", err);
});

connection.once("open", () => {
  console.log("connected to MLAB BOOOOOOYYAAAAAAAAKAAAASHAAAAAA");
});