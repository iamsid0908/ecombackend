
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const bodyParser=require("body-parser");
const errorMiddleware=require("./middleware/error")
const cookieParser = require("cookie-parser");

const cors=require("cors");
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

app.use(errorMiddleware)
app.use(cors({
    origin:'*'
}))
app.use(bodyParser.json());
app.use(cookieParser());

require("./app/routes/productRoutes")(app)
require("./app/routes/filterRoutes")(app)
require("./app/routes/userRoutes")(app)
require("./app/routes/orderRoutes")(app)
// console.log(process.env.PORT);

app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT);
})