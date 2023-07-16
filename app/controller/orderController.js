const OrderModel=require("../model/orderModel")
const Product =require("../model/productMode")

exports.newOrder= async(req,res,next)=>{
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
        
          const order = await OrderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });
        
          res.status(201).json({
            success: true,
            order,
          });
        }catch(err){
            res.status(404).json({
                sucess:false,
                message:err.message
      })
}
    
}
//get all order
exports.singleOrder=async(req,res,next)=>{
    try{
    const order=await OrderModel.findById(req.params.id).populate("user","name email");
    
    if(!order){
        return res.status(400).send({message:"order not found"});
    }
    res.status(200).json({
        sucess:true,
        order 
    })
}catch(err){
    return res.status(400).json({
        sucess:false,
        message:err.message
    })
}
}

//loged in user order
exports.myOrder=async(req,res,next)=>{
    try{
    const orders=await OrderModel.find({user:req.user._id});
    
    res.status(200).json({
        sucess:true,
        orders
    })
}catch(err){
    return res.status(400).json({
        sucess:false,
        message:err.message
    })
}
}

//get all orders --Admin
exports.getAllOrders=async(req,res,next)=>{
    try{
    const orders=await OrderModel.find({});
    
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount=totalAmount+order.totalPrice
    });
    res.status(200).json({
        sucess:true,
        orders,
        totalAmount
    })
}catch(err){
    return res.status(400).json({
        sucess:false,
        message:err.message
    })
}
}


// update Order Status -- Admin
exports.updateOrder=async(req,res,next)=>{
    try{
    const order=await OrderModel.findById(req.params.id);
    if(!order){
        return res.status(404).send({message:"order not foiund"});
    }

    if (order.orderStatus === "Delivered") {
        return next();
    }

    // if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      //}
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }
      await order.save({ validateBeforeSave: false });
    res.status(200).json({
        sucess:true,
      
    })
}catch(err){
    return res.status(400).json({
        sucess:false,
        message:err.message
    })
}
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }




  // delete Order -- Admin
  exports.deleteOrder=async(req,res,next)=>{
    try{
    const order=await OrderModel.findByIdAndRemove(req.params.id);
    // if (!order) {
    //     return next();
    //   }
    
    //   await order.remove();
    
    res.status(200).json({
        sucess:true,
       
    })
}catch(err){
    return res.status(400).json({
        sucess:false,
        message:err.message
    })
}
}
