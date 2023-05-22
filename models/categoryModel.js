const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  url_name: String,
  info: String,
  img_url: String,
},{timestamps:true})
exports.CategoryModel = mongoose.model("categories", schema)

exports.validateCategory = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(400).required(),
    url_name: Joi.string().min(2).max(400).required(),
    info: Joi.string().min(2).max(400).required(),
    // allow -> מאפשר לשלוח את האמפיין עם סטרינג ריק
    img_url: Joi.string().min(2).max(400).allow(null, ""),
  })
  return joiSchema.validate(_reqBody)
}