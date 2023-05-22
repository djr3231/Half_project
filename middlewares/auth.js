const jwt = require("jsonwebtoken")

exports.auth = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token" })
  }
  try{
    
    // מנסה לפענח את הטוקן
    const decodeToken = jwt.verify(token, config.TOKEN_SECRET);
    // req -> זהה בפונקציה הנל ובפונקציה הבאה בשרשור , ומאפיין שניצור בו יהיה קיים גם בפונקציה הבאה
    req.tokenData = decodeToken
    // מפעיל את הפונקציה הבאה בשרשור של הראוטר
    next();
  }
  catch(err){
    // אם נסיון הפענוח לא צלח  בגלל שהטוקן לא תקין או לא בתוקף
    // נגיע לכאן
    res.status(401).json({err:"token invalid or expired 2222 bbbbb"})
  }
}

exports.authAdmin = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need send token " })
  }
  try{
    
    // מנסה לפענח את הטוקן
    const decodeToken = jwt.verify(token, "monkeysSecret");
    if(decodeToken.role != "admin" && decodeToken.role != "superadmin" ){
      return res.status(401).json({err:"You must be admin in this endpoint"})
    }
    // req -> זהה בפונקציה הנל ובפונקציה הבאה בשרשור , ומאפיין שניצור בו יהיה קיים גם בפונקציה הבאה
    req.tokenData = decodeToken
    // מפעיל את הפונקציה הבאה בשרשור של הראוטר
    next();
  }
  catch(err){
    // אם נסיון הפענוח לא צלח  בגלל שהטוקן לא תקין או לא בתוקף
    // נגיע לכאן
    res.status(401).json({err:"token invalid or expired 2222 bbbbb"})
  }
}