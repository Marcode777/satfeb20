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

// database connection via sequelize ** Remember Sequelize will not create a database, it will create tables
connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});

var Chocolate = connection.define('chocolate')

//on top of the table data you create, Sequelize will automatically create a Primary ID and CreatedAt entry
//Sequelize will never modify a table that already exists **unless you use force:true**


//to insert multiple entries, you can use bulkCreate
// Chocolate.bulkCreate([
//   {name: 'Dark CHocolate', satisfaction:8},
//    name: 'White Chocolate',satisfaction:8}
// ]);