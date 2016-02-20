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
   unique:true,
   allowNull:false,
 },
});

Chocolates.create({
   chocolates :"Dark chocolate",
   satisfaction_level:8
   }).then(function(results){
     // res.redirect('/?msg=Success');
   }).catch(function(err){
     console.log(err.errors[0].message);
     // res.redirect('/?msg='+err.error[0].message);
   });
   
connection.sync().then(function(){
 app.listen(PORT,function(){
   console.log("Application is listening on PORT %s",PORT);
 });
});