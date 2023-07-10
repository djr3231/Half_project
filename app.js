const express = require("express");
const http = require("http");
const path = require("path");
const fileUpload = require("express-fileupload")
const {routesInit} = require("./routes/configRoutes")
require("./db/mongoConnect");
const cors=require("cors")

const app = express();

app.use(cors({
  methods:["GET","POST","PUT","DELETE"],
  origin:"*",
  allowedHeaders:[""]
}))

app.use(fileUpload({
  limits:{fileSize:"5mb"},
  useTempFiles:true
}))
app.use(express.json({limit:"5mb"}));

app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
const port = process.env.PORT || 3003;
server.listen(port);