var express = require('express');
var Brands=require("./routes/brandRouter")
var app = express();


var bodyParser= require('body-parser'); //to able server read the body of the requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,()=>{
	console.log("Server run on port "+port);
});

//default route
app.get('/',function(req,res){return res.send({error:true,message:'hello'})});

module.exports=app;



/*
const mysql = require('mysql');


//Database connection
var dbConn = mysql.createConnection({
		host     : 'remotemysql.com',
		user     : 'kv1c09X1Eq',
		password : 'GrlEBZnkaf',
		database : 'kv1c09X1Eq'
	});
	dbConn.connect(function(err) {
		if(err) throw err;
		console.log("Connected!");
	  });
	
*/
//handles url http://localhost:3000/api/Brands
// retrive all brand users accounts
/*app.get('/api/Brands', function(req, res, next) {
	dbConn.query('SELECT * from Brand_users', function (error, results, fields) {
		if (error) throw error ;
	
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		

	});
});
*/
app.use('/brands',Brands); 


//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
 
//all other requests are not implemented.
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});
 
module.exports = app;
