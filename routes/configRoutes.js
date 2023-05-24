const indexR = require("./index");
const usersR = require("./users");
const categoriesR = require("./categories");
const toysR = require("./toys");
const uploadsR = require("./uploads");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/categories",categoriesR);
  app.use("/toys",toysR);
  app.use("/uploads",uploadsR);
}