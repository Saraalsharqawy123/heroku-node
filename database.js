
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
	

      module.exports=dbConn;