var express = require('express');
 var router = express.Router();
 var Brand=require('../module/Brands');

 //For Authentication
const fs   = require('fs');
const jwt   = require('jsonwebtoken'); 
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync("module/keys/s.key","utf8");
var publicKEY  = fs.readFileSync("module/keys/p.key", 'utf8');  


 //login
     //https:localhost3000/brands/login
     router.post('/login',(req,res)=>{
       
        //get user
        
        Brand.Login(req.body,function(err,row){

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
                var Token =jwt.sign({'name':row.name}, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
                res.json({'success':1,'message':"Successful Login","token":Token});
                  
              } 
              else
              {
                res.json({'success':0,'message':" Please enter the correct username and password"});

              }
             });

            })
   
          




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




 //get all brands if user don't write id , or get specified brand by id    
    //https:localhost3000/brands/:id? 
    router.get('/:id?',function(req,res,next){
      if(req.params.id){     
      Brand.getBrandById(req.params.id,function(err,rows){
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
       
      Brand.getAllBrands(function(err,rows){
       
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
   

     
//insert new brand 
     ////https:localhost3000/brands/add
     router.post('/add',function(req,res,next){  
        Brand.addBrand(req.body,function(err,count){
         if(err)
         {
         res.json(err);
         }
         else{
         res.json(req.body);//or return count for 1 &amp;amp;amp; 0
        
         }
         });
        });
             

     //delete brand by id
     //https:localhost3000/brands/del/:id
     router.delete('/del/:id',function(req,res,next){
    Brand.deleteBrand(req.params.id,function(err,count){
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

    //update specified brand by id
    //https:localhost3000/brands/update/:id
     router.put('/update/:id',function(req,res,next){
    Brand.updateBrand(req.params.id,req.body,function(err,rows){
     
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
     //https:localhost3000/brands/logout
    


     module.exports=router;
