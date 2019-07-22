var express = require('express');
var Users=require("./routes/UserRouter");
var Cats=require("./routes/CatRouter");

var app = express();


var bodyParser= require('body-parser'); //to able server read the body of the requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8100;
}
app.listen(port,()=>{
	console.log("Server run on port "+port);
});

//default route
app.get('/',function(req,res){return res.send({error:true,message:'hello'})});

module.exports=app;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin,x-access-token, X-Requested-With, Content-Type, Accept");
    
    next();
  });
  
app.use('/Users',Users); 
app.use('/Cats',Cats); 


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
