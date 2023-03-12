const Product =require("../model/productMode")
const ErrorHandler=require("../../utils/errorHandling")
const catchAsyncfunc=require("../../middleware/catchAsyncError")

exports.createProduct=async(req,res,next)=>{
    try{
        req.body.user=req.user.id
        const product=await Product.create(req.body);
        res.status(201).json({
        success:true,
        product
    })
}catch{
    res.status(404).send({message:"something error"})
}}



exports.getAllProduct=(req,res)=>{
    Product.find({})
    .then(data=>{
        res.send(data)
        
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.updateProduct = async(req,res,next)=>{
    var product;
    try{
     product=await Product.findById(req.params.id);

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
    }catch{

    if(!product){
        return res.status(500).json({
            success:true,
            message:"Product not found"
        })
    }}}

exports.deleteProduct=async(req,res,next)=>{
    var product;
    try{ 
        await Product.findById(req.params.id);

        product=await Product.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success:true,
        product
    })

    }catch(err){
    if(!product){
        return res.status(404).send({message:"something went wrong"})
    }
}}

exports.getOneProduct=async(req,res,next)=>{
    var product;
    try{
         product =await Product.findById(req.params.id);
        res.status(200).json({
            success:true,
            product
        })
    }catch(err){
    
    if(!product){
        return res.status(404).send({message:err.message});
    }
}}

// create new review and update review

exports.createProductReview=async (req,res,next)=>{

    const{rating,comment,productId}=req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product=await Product.findById(productId);
    const isReviewed = product.reviews.find(
    (rev) => {rev.user.toString() === req.user._id.toString()}
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
    }else{
        product.reviews.push(review);
        product.numOfReviews =product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    const strNumber = avg;
    const digitsArray = strNumber.split("");
    const sum = digitsArray.reduce((acc, digit) => acc + Number(digit), 0);
    product.ratings = sum / product.reviews.length;
    

    await product.save({validateBeforeSave:false});
    res.status(200).json({
        status:true
    })

}

// get all reviews

exports.getAllReviews=async (req,res,next)=>{
    try{
    const product=await Product.findById(req.query.id);
    if(!product){
        return res.status(403).send({message:"product not found for review"})
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}catch{
    res.status(404).json({
        success:false
    })
}
}

// delete review
exports.deleteReviews=async (req,res,next)=>{
    try{
    const product=await Product.findById(req.query.productId);
    if(!product){
        return res.status(403).send({message:"product not found for review"})
    }

    const reviews=product.reviews((rev)=>{
        rev._id.toString() !== req.query.id.toString();
    })

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    const strNumber = avg;
    const digitsArray = strNumber.split("");
    const sum = digitsArray.reduce((acc, digit) => acc + Number(digit), 0);
    const ratings = sum / reviews.length;
    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    // res.status(200).json({
    //     success:true,
        
    // })
}catch{
    res.status(404).json({
        success:false
    })
}
}