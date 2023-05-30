const { config } = require('../config/secret');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.PASS_DB}:${config.USER_DB}@davdata.it0ecvp.mongodb.net/idf8`);
  console.log("mongo connect Half_project");
}


