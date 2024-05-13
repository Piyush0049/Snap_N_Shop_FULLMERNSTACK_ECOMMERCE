const express = require("express")
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"})
const product = require("./routes/productroute");
const order = require("./routes/orderroute")
const user = require("./routes/userroutes");
const bodyparser = require("body-parser");
const payment = require("./routes/paymentroute")
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended : true}))
app.use(fileupload())
app.use("/api/v1", order)
app.use("/api/v1", product)
app.use("/auth", user)
app.use("/api/v1", payment)
app.get("/", (req,res)=>{
    res.send("The server is working")
})
module.exports = app;
