const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  info: String,
  category: String,
  img_url: String,
  price: Number,
  user_id: String,
},{timestamps:true})
exports.toyModel = mongoose.model("toys", schema)

exports.validatetoy = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    info: Joi.string().min(2).max(600).required(),
    category: Joi.string().min(2).max(100).required(),
    img_url: Joi.string().min(2).max(400).allow(null,""),
    price: Joi.number().min(1).max(99999).required(),
    
  })
  return joiSchema.validate(_reqBody)
}