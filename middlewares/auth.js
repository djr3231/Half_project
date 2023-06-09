const d = require("dotenv").config();
const jwt = require("jsonwebtoken")

exports.auth = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token" })
  }
  try{
    
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.tokenData = decodeToken
    next();
  }
  catch(err){
    res.status(401).json({err:"token invalid or expired 2222 bbbbb"})
  }
}

exports.authAdmin = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token " })
  }
  try{
    
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if(decodeToken.role != "admin" && decodeToken.role != "superadmin" ){
      return res.status(401).json({err:"You must be admin in this endpoint"})
    }
    req.tokenData = decodeToken
    next();
  }
  catch(err){
    res.status(401).json({err:"admin token invalid or expired 3333 bbbbb"})
  }
}