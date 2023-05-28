// const { config } = require('../config/secret');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/Half_project`);
  console.log("mongo connect Half_project");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


