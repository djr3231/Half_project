require('dotenv').config();

console.log(process.env.USER_DB);
exports.config = {
    PASS_DB:process.env.PASS_DB,
    USER_DB:process.env.USER_DB,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    CLOUD_NAME:"dsuf9eewi",
    CLOUD_KEY:"591731972811113",
    CLOUD_SECRET:"AhGxU_k6zzs23yd58vunuftGoq0"
  }