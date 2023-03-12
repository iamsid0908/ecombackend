const Product=require("../model/productMode")

exports.search=async(req,res)=>{
    var data;
    try{
    console.log(req.params.key)
     data =await Product.find({
        "$or":[
            {"name":{$regex:req.params.key}},
            // {"price":{$regex:req.params.key}}
        ]
    })
    res.send(data);
}catch{
    res.status(400).send({message:"wrong"})
}
}