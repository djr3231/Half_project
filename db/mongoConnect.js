const { config } = require('../config/secret');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.USER_DB}:${config.PASS_DB}@davdata.it0ecvp.mongodb.net/idf8`);
  console.log("mongo connect idf8 atlas");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


