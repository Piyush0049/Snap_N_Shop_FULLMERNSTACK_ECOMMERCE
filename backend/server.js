const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connecttodatabase = require("./config/database");
dotenv.config({path:"backend/config/config.env"})
app.use(cors({
    origin : "*",
    methods : ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials : true
}));

connecttodatabase();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})
app.listen(process.env.PORT, ()=>{
    console.log(`App working on http://localhost:${process.env.PORT}`)
})
