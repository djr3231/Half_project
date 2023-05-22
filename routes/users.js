const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, validateUser, validateLogin, createToken } = require("../models/userModel")
const { auth, authAdmin } = require("../middlewares/auth")
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Users endpoint" });
})



// auth -> קורא קודם לפונקציית מיידל וואר שבודקת אם יש טוקן
router.get("/userInfo", auth, async (req, res) => {
  try {

    const user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
    res.json(user)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

// authAdmin -> נותן הרשאה רק למי שהוא אדמין או סופר אדמין
router.get("/usersList", authAdmin, async (req, res) => {
  try {
    const data = await UserModel.find({}, { password: 0 })
    res.json(data)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/", async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = new UserModel(req.body);
    // הצפנה של הסיסמא
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // שינוי תצוגת הסיסמא לצד לקוח המתכנת
    user.password = "*****";
    res.status(201).json(user);
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(401).json({ err: "Email already in system", code: 11000 })
    }
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/login", async (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // בודק אם המייל שנשלח בכלל קיים במסד
    // findOne -> מוצא אחד בלבד ומחזיר אובייקט,אם לא מוצא מחזיר אנדיפיינד
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Email not found!" });
    }
    // אם הסיסמא מתאימה לרשומה שמצאנו במסד שלנו כמוצפנת
    //  bcrypt.compare -> בודק אם הסיסמא שהגיע מהצד לקוח בבאדי
    // תואמת לסיסמא המוצפנתת בסיסמא
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ msg: "Password worng!" });
    }
    const token = createToken(user._id, user.role);
    res.json({ token , role:user.role });
    // לשלוח טוקן
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

// אדמין יוכל להפוך משתמש לאדמין או למשתמש רגיל
router.patch("/changeRole/:id/:role", authAdmin, async (req, res) => {
  try {
    const {id,role} = req.params;
    if(role != "user" && role != "admin"){
      return res.status(401).json({err:"You can send admin or user role"})
    }
    // אדמין לא יוכל לשנות את עצמו
    if(id == req.tokenData._id){
      return res.status(401).json({err:"you cant change your self"})
    }
    // RegExp -> פקודת שלילה חייבת לעבוד עם ביטוי רגולרי
    // כדי לדאוג שלא נוכל להשפיע על סופר אדמין
    const data = await UserModel.updateOne({_id:id,role:{$not:new RegExp("superadmin")}},{role});
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

// מעדכן מועדפים במערך של משתמש
router.patch("/updateFavs/", auth, async(req,res) => {
  try{
    // בדוק שהבאדי שלך פאבס איי אר שהוא מערך
    if(!Array.isArray(req.body.favs_ar)){
      return res.status(400).json({msg:"You need to send favs_ar as array"});
    }
    const data = await UserModel.updateOne({_id:req.tokenData._id},{favs_ar:req.body.favs_ar})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const {id} = req.params;
    // אדמין לא יוכל לשנות את עצמו
    if(id == req.tokenData._id){
      return res.status(401).json({err:"you cant delete your self"})
    }
    // RegExp -> פקודת שלילה חייבת לעבוד עם ביטוי רגולרי
    // כדי לדאוג שלא נוכל להשפיע על סופר אדמין
    const data = await UserModel.deleteOne({_id:id,role:{$not:new RegExp("superadmin")}});
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

module.exports = router;