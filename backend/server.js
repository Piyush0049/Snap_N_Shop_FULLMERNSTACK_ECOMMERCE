const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connecttodatabase = require("./config/database");
dotenv.config({path:"backend/config/config.env"})
app.use(cors({
    origin : "https://main--golden-custard-15c962.netlify.app",
    methods : ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials : true
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://main--golden-custard-15c962.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
connecttodatabase();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})
app.listen(process.env.PORT, ()=>{
    console.log(`App working on http://localhost:${process.env.PORT}`)
})
