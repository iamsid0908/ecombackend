const FilterController=require("../controller/filtersController")

module.exports=app=>{
    app.get("/api/product/filter/:key",FilterController.search);
}