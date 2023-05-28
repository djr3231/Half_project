const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  role:{
    type:String, default:"user"
  },
},{timestamps:true});

exports.UserModel = mongoose.model("users",userSchema);

exports.createToken = (user_id,role = "user") => {
  // מייצרים טוקן
  // פרמטר ראשון התכולה של הטוקן ,כרגע איי די בהמשך יהיה גם רול/תפקיד
  // פרמטר שני - מילה סודית בשביל לפענח את הטוקן
  // פרמטר שלישי תוקף הטוקן
  const token = jwt.sign({_id:user_id,role},process.env.TOKEN_SECRET,{expiresIn:"60000mins"})
  return token;
}


exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string ().min(2).max(150).required(),
    email:Joi.string().min(2).max(200).email().required(),
    password:Joi.string().min(3).max(150).required()
  })

  return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(200).email().required(),
    password:Joi.string().min(3).max(150).required()
  })

  return joiSchema.validate(_reqBody);
} 