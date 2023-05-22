const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  info: String,
  price: Number,
  category_url: String,
  img_url: String,
  user_id: String,
},{timestamps:true})
exports.ProductModel = mongoose.model("products", schema)

exports.validateProduct = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    info: Joi.string().min(2).max(600).required(),
    price: Joi.number().min(1).max(99999).required(),
    category_url: Joi.string().min(2).max(100).required(),
    img_url: Joi.string().min(2).max(400).allow(null,""),
  })
  return joiSchema.validate(_reqBody)
}