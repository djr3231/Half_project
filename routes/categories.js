const express = require("express");
const {CategoryModel,validateCategory} = require("../models/categoryModel");
const { authAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    const perPage = req.query.perPage || 20;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;
    const data = await CategoryModel
    .find({})
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

router.post("/", authAdmin, async(req,res) => {
  const validBody = validateCategory(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const category = new CategoryModel(req.body);
    await category.save();
    res.json(category);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", authAdmin, async(req,res) => {
  const validBody = validateCategory(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    const data = await CategoryModel.updateOne({_id:id},req.body)
    // modfiedCount:1 - אם הצליח
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", authAdmin, async(req,res) => {
  try{
    const id = req.params.id;
    const data = await CategoryModel.deleteOne({_id:id})
    // deletedCount:1 - אם הצליח
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;