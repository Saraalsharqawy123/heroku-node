var db=require("../database"); //reference of dbconnection.js
 
var User={
 
getAllUsers:function(callback){
 
return db.query("Select * from Brand_users",callback);
 
},
 getUserById:function(id,callback){
 
return db.query("select * from Brand_users where Id=?",[id],callback);
 },
 getUserByEmail:function(email,callback){
 
    return db.query("select * from Brand_users where email=?",[email],callback);
     }
     ,
 Login:function(user,callback){
 
return db.query("SELECT * FROM Brand_users WHERE email = '"+user.email+" ' and password = '"+user.password+"'",callback);
 },
 addUser:function(Brand,callback){
 return db.query("Insert into Brand_users (name,address,phone,email,password,gender,review) Values(?,?,?,?,?,?,?)",[Brand.name,Brand.address,Brand.phone,Brand.email,Brand.password,Brand.gender,Brand.review],callback);
 },
 deleteUser:function(id,callback){
  return db.query("delete from Brand_users where Id=?",[id],callback);
 },
 
 updateUser:function(Brand,callback){
  return db.query("update Brand_users set name=?,address=?,phone=?,email=?,gender=? where Id=?",[Brand.name,Brand.address,Brand.phone,Brand.email,Brand.gender,Brand.Id],callback);
 },
 
 ChangePass:function(user,callback){
    
    return db.query("update Brand_users set password=? where Id=? ",[user.newpass,user.Id],callback);
   },
   
 checkReview:function(user,callback){
 
   return db.query("select * from Reviews where currentUserId=? and userId=?",[user.userId,user.ownerId],callback);
    },
    
 InsertReview:function(user,callback){
 
   return db.query("insert into Reviews (currentUserId,userId,review) Values(?,?,?)",[user.userId,user.ownerId,user.rate],callback);
    },
    
 UpdateReview:function(user,callback){
 
   return db.query("update  Reviews set review=? where currentUserId=? and userId=?",[user.rate,user.userId,user.ownerId],callback);
    }
    ,
    getReview:function(ownerId,callback){
 
      return db.query("select review from Reviews where  userId=?",[ownerId],callback);
       }
};
 module.exports=User;