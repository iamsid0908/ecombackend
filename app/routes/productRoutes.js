const { isAuthenticated,authorizedRoles } = require("../../middleware/auth");
const ProductController=require("../controller/productController")

module.exports=app=>{
    app.get("/api/product", ProductController.getAllProduct);
    app.post("/api/product",isAuthenticated, authorizedRoles("admin") ,ProductController.createProduct);
    app.put("/api/product/:id",isAuthenticated, authorizedRoles("admin"), ProductController.updateProduct);
    app.delete("/api/product/:id",  ProductController.deleteProduct);
    app.get("/api/product/:id", ProductController.getOneProduct);
    app.put("/api/review", isAuthenticated, ProductController.createProductReview);
    app.delete("/api/productdelete", isAuthenticated, ProductController.deleteProduct);
    app.get("/api/allreview", isAuthenticated, ProductController.getAllReviews);
    
}