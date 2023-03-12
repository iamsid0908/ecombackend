const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter desc"]
    },
    price:{
        type:Number,
        required:[true,"please enter price"],
        maxLength:[8,"not more 8"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
    {
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter product cate"]
    },
    stock:{
        type:Number,
        require:[true,"please enter product stock"],
        maxLength:[4],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                require:true
            },
            name:{
                type:String,
                // require:true
            },
            rating:{
                type:String,
                // required:true
            },
            comment:{
                type:String,
                // required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Product",productSchema)