const express = require("express");
const {toyModel,validatetoy} = require("../models/toyModel");
const { auth } = require("../middlewares/auth");
const { config } = require("dotenv");
const router = express.Router();


router.get("/", async (req, res) => {
  res.json({ msg: "toys endpoint"
  });
  
})

router.get("/", async(req,res) => {
  try{
    const perPage = req.query.perPage || 10;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;
    const category = req.query.category;
    const search = req.query.s;
    const user_id = req.query.user_id;
   
    let filterFind = {}
    if(category){
      filterFind = {category:category}
    }
    if(search){
      const searchExp = new RegExp(search,"i");
      // יחפש את הביטוי גם בשם וגם באינפו 
      filterFind = {$or:[{name:searchExp},{info:searchExp}]}
    }
    if(user_id){
      filterFind = {user_id}
    }
    
    const data = await toyModel
    .find(filterFind)
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
// router.get("/count", async(req,res) => {
//   try{
//     const perPage = req.query.perPage || 10;
//     const category = req.query.category;
//     const search = req.query.s;
//     const user_id = req.query.user_id;
//     let filterFind = {}
//     if(category){
//       filterFind = {category:category}
//     }
//     if(search){
//       const searchExp = new RegExp(search,"i");
//       filterFind = {$or:[{name:searchExp},{info:searchExp}]}
//     }
//     if(user_id){
//       filterFind = {user_id}
//     }
//     const count = await toyModel.countDocuments(filterFind);
//     res.json({count,pages:Math.ceil(count/perPage)})
//   }
//   catch(err){
//     console.log(err);
//     res.status(502).json({err})
//   }
// })



router.post("/", auth, async(req,res) => {
  
  const validBody = validatetoy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const toy = new toyModel(req.body);
    toy.user_id = req.tokenData._id;
    await toy.save();
    res.json(toy);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", auth, async(req,res) => {
  const validBody = validatetoy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    let data;
    if(req.tokenData.role != "user"){
      data =  await toyModel.updateOne({_id:id},req.body)
    }
    else{
      data = await toyModel.updateOne({_id:id,user_id:req.tokenData._id},req.body)

    }
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", auth, async(req,res) => {
  try{
    const id = req.params.id;
    let data;
    if(req.tokenData.role != "user"){
      data = await toyModel.deleteOne({_id:id})
    }

    else{
      data = await toyModel.deleteOne({_id:id,user_id:req.tokenData._id})
    }
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})



module.exports = router;