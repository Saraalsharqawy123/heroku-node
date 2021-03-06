var express = require('express');
 var router = express.Router();
 var User=require('../module/User');

 var bodyParser= require('body-parser'); //to able server read the body of the requests.
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended:true}));
 
 //For Authentication
const fs   = require('fs');
const jwt   = require('jsonwebtoken'); 
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync("./module/keys/s.key","utf8");
var publicKEY  = fs.readFileSync("./module/keys/p.key", 'utf8');  




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
              
                var Token =jwt.sign({'name':req.body.email}, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
                
                //res.json({'user':req.body.email,'message':"Successful Login","token":Token});
       res.send({'email':req.body.email,'message':'Successful Login','token':Token,'success':1});
                  
              } 
              else
              {
                res.json({'success':0,'message':" Please enter the correct username and password"});

              }
             });

            })
   
//Registeration No Token needed
//insert new User 
     ////https:localhost3000/Users/add
     
     router.post('/add',function(req,res,next){ 
       
       User.addUser(req.body,function(err,count){
       if(err)
       {
         console.log(err)
       res.json(err);
       }
       else{
        var Token =jwt.sign({'name':req.body.email}, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
        
       
       //res.json(JSON.stringify({email:req.body.email,message:'Successful Register',token:Token}));
       res.json({'email':req.body.email,'message':'Successful Register','token':Token});
                  
     //   res.json(Token);
          console.log("dooooone");
        
       }
       });

       
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
     
        
     router.get('/info/:email?',function(req,res,next){
      
     if(req.params.email){     
        User.getUserByEmail(req.params.email,function(err,result){
     if(err)
       {
       res.json(err);
       }
       else{
       res.json(result);
       }
       });
      }
      
      });

       
        //change password

        router.put('/changePass',function(req,res){
      
           User.ChangePass(req.body,function(err,result){
          
            if(err)
            {
            res.json({status:0,msg:"Please write correct old password"});
            //res.json(err);
            }
            else{
              res.json({status:1,msg:"Done .. password changed"});
            
            }
            });
           
           
           });
     
     

        //Edit Profile

        router.put('/EditProfile',function(req,res){
      
          User.updateUser(req.body,function(err,result){
         
           if(err)
           {
           res.json({status:0,msg:err});
           //res.json(err);
           }
           else{
             res.json({status:1});
           
           }
           });
          
          
          });
    
//Reviews

router.get('/Reviews/:id',function(req,res){
  if(req.params.id)
      {
          User.getReview(req.params.id,function(err,rows){

            if(err)
            {res.json(err);}
            else
            {
              res.json(rows);
            }
          })
      }  

});

        router.post('/Reviews',function(req,res){
      
          //check user Id review this user previous.
            User.checkReview(req.body,function(err,rows){

                if(err){res.send(err);}
                else{
                    //if there past reviews update it else create new one
                   if(rows.length !=0)
                   {
                     //update
                     User.UpdateReview(req.body,function(err,rows){

                      if(err){res.json(err);}
                      else{
                        res.json({done:true})}
                     })
                   }
                   else
                   {
                     //insert
                     
                     User.InsertReview(req.body,function(err,rows){

                      if(err){res.json(err);}
                      else{
                        res.json({done:true})}
                     })
                   }

                }
            });


          });
    
         
     module.exports=router;
