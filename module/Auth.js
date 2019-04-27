const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync("F:/sara/api/myapp/module/keys/s.key","utf8");
var publicKEY  = fs.readFileSync("F:/sara/api/myapp/module/keys/p.key", 'utf8');  

module.exports = {
 sign: (payload) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */
  // Token signing options
  /*var signOptions = {
      issuer:  $Options.issuer,
      subject:  $Options.subject,
      audience:  $Options.audience,
      expiresIn:  "30d",    // 30 days validity
      algorithm:  "RS256"    
  };*/
  return jwt.sign(payload, privateKEY, { expiresIn:  "30d",  algorithm:  "RS256"});
},
verify: (token) => {

    return jwt.verify(token,publicKEY,{ expiresIn:  "30d",  algorithm:  "RS256"});
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}