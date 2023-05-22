const express = require("express");
const http = require("http");
const path = require("path");
const fileUpload = require("express-fileupload")
const {routesInit} = require("./routes/configRoutes")
require("./db/mongoConnect");

const app = express();

// מאפשר לשגר קבצים מצד לקוח לצד שרת
// מגביל את הקבצים לגודל 5 מב,  ושיצרו
// קובץ עם כתובת זמנית על השרת
app.use(fileUpload({
  limits:{fileSize:"5mb"},
  useTempFiles:true
}))
// מאפשר לשלוח באדי דרך הצד לקוח
app.use(express.json({limit:"5mb"}));

// להגדיר תיקייה סטטית שתיהיה התיקייה בשם פאבליק
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
// בודק אם אנחנו על שרת אמיתי ואם כן דואג שנקבל את הפורט שהענן צריך
// אם לא הברירת מחדל תיהיה 3003
const port = process.env.PORT || 3003;
server.listen(port);