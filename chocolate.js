var express = require('express');
var Sequelize = require('sequelize');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var PORT = process.env.NODE_ENV || 8080;

var app = express();

app.engine('handlebars',expressHandlebars({
 defaultLayout :'main'
}));

app.set('view engine','handlebars');

var connection = new Sequelize ('chocolates_db','root');

app.use(bodyParser.urlencoded({
 extended :false
}));
//these are the instructions to create the table in chocolates_db
var Chocolates = connection.define ('chocolate',{
 chocolates : {
   type : Sequelize.STRING,
   unique : true,
   allowNull: false,
 },
 satisfaction_level: {
   type:Sequelize.INTEGER,
   unique:false,//changed this to false bc it's not a unique because satisfaction levels can be the same for different chocolates
   allowNull:false,
 },
});

// Chocolates.create({
//    chocolates :"Dark chocolate",
//    satisfaction_level:8
//    }).then(function(results){
//      // res.redirect('/?msg=Success');
//    }).catch(function(err){
//      console.log(err.errors[0].message);
//      // res.redirect('/?msg='+err.error[0].message);
//    });

Chocolates.bulkCreate([
  {chocolates: 'Sweet Chocolate', satisfaction_level:8},//these entries have to be the same as what you defined in var Chocolates like chocolates and satisfaction_level
   {chocolates: 'White Chocolate',satisfaction_level:8},
   {chocolates: 'Extra Sweet Chocolate', satisfaction_level:9}
]);
connection.sync().then(function(){
 app.listen(PORT,function(){
   console.log("Application is listening on PORT %s",PORT);
 });
});