var express = require('express');
var Users=require("./routes/UserRouter");
const cors = require('cors');
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



app.use('/Users',Users); 


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
