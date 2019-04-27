var db=require("../database"); //reference of dbconnection.js
 
var Brand={
 
getAllBrands:function(callback){
 
return db.query("Select * from Brand_users",callback);
 
},
 getBrandById:function(id,callback){
 
return db.query("select * from Brand_users where Id=?",[id],callback);
 },
 Login:function(user,callback){
 
return db.query("SELECT * FROM Brand_users WHERE email = '"+user.email+" ' and password = '"+user.password+"'",callback);
 },
 addBrand:function(Brand,callback){
 return db.query("Insert into Brand_users (name,address,phone,email,password,delivery,review) Values(?,?,?,?,?,?,?)",[Brand.name,Brand.address,Brand.phone,Brand.email,Brand.password,Brand.delivery,Brand.review],callback);
 },
 deleteBrand:function(id,callback){
  return db.query("delete from Brand_users where Id=?",[id],callback);
 },
 
 updateBrand:function(id,Brand,callback){
  return db.query("update Brand_users set name=?,address=?,phone=?,email=?,password=?,delivery=? where Id=?",[Brand.name,Brand.address,Brand.phone,Brand.email,Brand.password,Brand.delivery,id],callback);
 }
 
};
 module.exports=Brand;