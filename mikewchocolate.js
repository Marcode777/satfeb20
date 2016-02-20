//express setup
var express = require('express');
var app = express();
var port = 3000;

//database setup
var Sequelize = require('sequelize'); //this swaps out mySQL, e.g., we're not referencing mysql here
var connection = new Sequelize('chocolate', 'root');

//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
app.get('/', function(req, res) {
    res.render('chocolate');//render implies rendering a template, it will look for a file called chocolate in the view folder
});

// database connection via sequelize
connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});