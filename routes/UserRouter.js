var express = require('express');
 var router = express.Router();
 var User=require('../module/User');

 //For Authentication
const fs   = require('fs');
const jwt   = require('jsonwebtoken'); 
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync("module/keys/s.key","utf8");
var publicKEY  = fs.readFileSync("module/keys/p.key", 'utf8');  



 //login
     //https:localhost3000/Users/login
     router.post('/login',(req,res)=>{
       
        //get user
        
        User.Login(req.body,function(err,row){

          
            if(err)
              {
              res.json(err);
              }
              else if(row.length != 0)
              {
               var sOptions = {
                    issuer: "smartToys",
                    subject: "About Login", 
                    audience: "username" // this should be provided by client
               }
               //this token to create session with user
               // var Token= auth.sign({'name':row.name})
              
                var Token =jwt.sign({'name':row.email}, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
                res.json({'user':req.body.email,'message':"Successful Login","token":Token});
                  
              } 
              else
              {
                res.json({'success':0,'message':" Please enter the correct username and password"});

              }
             });

            })
   /*
            router.options("*",function(req,res,next){
              res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
               //other headers here
                res.status(200).end();
            });
*/
//Registeration No Token needed
//insert new User 
     ////https:localhost3000/Users/add
     
     router.post('/add',function(req,res,next){ 
       console.log(req.body);
       
        result={};
       user=req.email; 
      User.addUser(req.body,function(err,count){
       if(err)
       {
         console.log("errrrrror")
       result=res.json(err);
       }
       else{
console.log("dooooone");
        var Token =jwt.sign({'name':user}, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
        
         result=res.json({"email":req.body.email,"token":Token});
        
       }
       });

       return result;
      });
           



   // check header or url parameters or post parameters for token
   router.use((req, res, next)=>{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    
    if(token != null){
      //var result=auth.verify(token).exp;
       jwt.verify(token,publicKEY,{ expiresIn:  "30d",  algorithm:  "RS256"},(err,dec)=>{

        if(err)
        {
          res.json("Not Authorized to access ,Please Signin");
        }
        else
        {
          //res.json(dec);
          next();
        }
       });
        
    }
    else{
      
      res.json("No Token");
      
    
   
    }
});




 //get all Users if user don't write id , or get specified User by id    
    //https:localhost3000/Users/:id? 
    router.get('/:id?',function(req,res,next){
      if(req.params.id){     
      User.getUserById(req.params.id,function(err,rows){
      if(err)
        {
        res.json(err);
        }
        else{
        res.json(rows);
        }
        });
       }
       else{
       
      User.getAllUsers(function(err,rows){
       
      if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
       
       });
       }
       });
   


     //delete User by id
     //https:localhost3000/Users/del/:id
     router.delete('/del/:id',function(req,res,next){
    User.deleteUser(req.params.id,function(err,count){
     deletedId=req.params.id;
    if(err)
      {
      res.json(err);
      console.log("Yes here 29");
      }
      else
      {
      
      res.json({'deletedId':deletedId,'message':"Account is deleted"});

      }
     
    });


     });

    //update specified User by id
    //https:localhost3000/Users/update/:id
     router.put('/update/:id',function(req,res,next){
    User.updateUser(req.params.id,req.body,function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(rows);
      }
      });
     });
     
    
        

 //logOut
     //https:localhost3000/Users/logout
    


     module.exports=router;
