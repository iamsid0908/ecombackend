
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const bodyParser=require("body-parser");
const errorMiddleware=require("./middleware/error")
const cookieParser = require("cookie-parser");
const cloudinary=require("cloudinary")
const cors=require("cors");
const fileUpload=require("express-fileupload")
// require('dotenv').config({ path: './.env' })
require('dotenv').config()

mongoose.connect("mongodb+srv://sidd:sidd@cluster0.rtijjft.mongodb.net/?retryWrites=true&w=majority")

const db=mongoose.connection;
db.on("open",()=>{
    console.log("connected db")
})

db.on("error",()=>{
    console.log("dis-connected");
})

cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET
})


app.use(errorMiddleware)
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

require("./app/routes/productRoutes")(app)
require("./app/routes/filterRoutes")(app)
require("./app/routes/userRoutes")(app)
require("./app/routes/orderRoutes")(app)
console.log(process.env.PORT);

app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT);
})