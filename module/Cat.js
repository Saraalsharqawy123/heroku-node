var db=require("../database"); //reference of dbconnection.js
 
var Cat={
 
getAllCats:function(callback){
 
return db.query("Select * from Cats",callback);
 
},
 getCatById:function(id,callback){
 
return db.query("select * from Cats where userId=?",[id],callback);

 },
 getCatByAddress:function(country,callback){
 
    return db.query("SELECT Cats.* ,Brand_users.email,Brand_users.name,Brand_users.gender  as usergender FROM Cats INNER JOIN Brand_users ON Cats.userId = Brand_users.Id and Brand_users.address=? and  Cats.status=?",[country,false],callback);
    
     },
 
 addCat:function(Cat,callback){
   
 return    db.query("Insert into Cats (img,type,gender,age,goal,note,love,status,price,userId) Values(?,?,?,?,?,?,?,?,?,?)",[Cat.img,Cat.type,Cat.gender,Cat.age,Cat.goal,Cat.note,Cat.love,Cat.status,Cat.price,Cat.userId],callback);
 
},
 deleteCat:function(id,callback){
  return db.query("delete from Cats where Id=?",[id],callback);
 },
 
 updateCat:function(Cat,callback){
  return db.query("update Cats set img=?,type=?,age=?,goal=?,note=?,status=? ,price=?,gender=? where Id=?",[Cat.img,Cat.type,Cat.age,Cat.goal,Cat.note,Cat.status,Cat.price,Cat.gender,Cat.Id],callback);
 }
 ,

 updateLove:function(Cat,callback){
    return db.query("update Cats set love=? where Id=? ",[Cat.love,Cat.Id],callback);
   },
   InsertLove:function(Cat,callback){
     return db.query("Insert into favourite (catId,userId) Values(?,?)",[Cat.Id,Cat.userId],callback);

   },
   
   DeleteLove:function(Cat,callback){
    return db.query("DELETE FROM favourite where catId=? and userId=?",[Cat.catId,Cat.userId],callback);

  },
   ReadLove:function(address,callback){
     return db.query("SELECT favourite.*  FROM favourite INNER JOIN Cats ON Cats.Id = favourite.catId INNER JOIN Brand_users ON Brand_users.Id = favourite.userId where Brand_users.address=?",address,callback);

   }
};
 module.exports=Cat;