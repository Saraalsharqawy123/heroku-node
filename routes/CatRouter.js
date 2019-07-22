var express = require('express');
 var router = express.Router();
 var Cat=require('../module/Cat');

 var bodyParser= require('body-parser'); //to able server read the body of the requests.
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended:true}));

 //For Authentication
 const fs   = require('fs');
 const jwt   = require('jsonwebtoken'); 
 // use 'utf8' to get string instead of byte array  (512 bit key)
 var publicKEY  = fs.readFileSync("./module/keys/p.key", 'utf8');  
 
 





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



//insert new Cat
     //https:localhost3000/Cats/add
     router.post('/add',function(req,res,next){ 
       
        Cat.addCat(req.body,function(err,row){

            if(err)
            {
      res.json({'success':0,'data':err});
      
            }
            else
            {
              Cat.InsertLove(req.body);
                        
                        
      res.json({'success':1,'data':row});
            }
        });
      
       
    }); 
 

// get specified Cats by userId    
    //https:localhost3000/Cats/:id 
    router.get('/:id?',function(req,res,next){
      if(req.params.id){     
      Cat.getCatById(req.params.id,function(err,rows){
      if(err)
        {
        res.json(err);
        }
        else{
        res.json(rows);
        }
        });
       }
      
       });
   

//get Cats by UserAddress    
    //https:localhost3000/Cats/address/ 
    router.get('/address/:add',function(req,res,next){
      if(req.params.add){     
      Cat.getCatByAddress(req.params.add,function(err,catrows){
      if(err)
        {
        res.json(err);
        }
        else{
          Cat.ReadLove(req.params.add,function(err,loverows){

                res.json({cats:catrows,loves:loverows});

          })
        }
        });
       }
      
       });
   

//Delete Cat by id
     //https:localhost3000/Cats/del/:id
     router.delete('/del/:id',function(req,res,next){
    Cat.deleteCat(req.params.id,function(err,count){
     deletedId=req.params.id;
    if(err)
      {
      res.json({'success':0,'error':err});
      }
      else
      {
      
      res.json({'success':1,'deletedId':deletedId});

      }
     
    });


     });


//update Cat by id
    //https:localhost3000/Cats/update/:id
     router.put('/update',function(req,res){
    Cat.updateCat(req.body,function(err,rows){
     
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
     
    
//LOVE
    //update specified love
    //https:localhost3000/Cats/love
    router.put('/love',function(req,res){
      Cat.updateLove(req.body,function(err,rows){
       
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
       
    //Insert cat love
    router.post('/love',function(req,res){
      Cat.InsertLove(req.body,function(err,rows){
 
      if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
        }
      );
      });
      

    //delete cat love
    router.post('/love/delete',function(req,res){
    
      Cat.DeleteLove(req.body,function(err,rows){
         
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
       
    
     module.exports=router;
