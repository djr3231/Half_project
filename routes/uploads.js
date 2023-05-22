const express = require("express");
const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({
  cloud_name: "dccoiwwxy",
  api_key: "664974667326928",
  api_secret: "dZhz2yfM5I8k9OB60HO9zVprjpI"
});

router.get("/", async(req,res) => {
  res.json({msg:"Upload work"});
})
router.post("/cloud_server", async(req,res) => {
  try{
    const myFile = req.body.myFile;
    if(myFile){
      // מעלה את התמונה לקלואדינרי 
      const data = await cloudinary.uploader.upload(myFile ,{ unique_filename:true})
      // console.log(myFile);
      // יחזיר פרטים על התמונה שנמצאת בשרת כולל הכתובת שלה
      // ב secure_url
      res.json(data)

    }
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/cloud1", async(req,res) => {
  try{
    const myFile = req.files.myFile;
    console.log(myFile);
    res.json({msg:"file sended"})
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


module.exports = router;