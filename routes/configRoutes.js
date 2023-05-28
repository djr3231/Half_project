const indexR = require("./index");
const usersR = require("./users");
const categoriesR = require("./categories");
const toysR = require("./toys");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/categories",categoriesR);
  app.use("/toys",toysR);
}