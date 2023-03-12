const express=require("express")
const { isAuthenticated, authorizedRoles } = require("../../middleware/auth")
const OrderController=require("../controller/orderController")

module.exports=app=>{
    app.post("/api/postorder",isAuthenticated, OrderController.newOrder)
    app.get("/api/getorder/:id",isAuthenticated, OrderController.singleOrder)
    app.get("/api/myorder",isAuthenticated, OrderController.myOrder)
    app.get("/api/admin/orders",isAuthenticated,authorizedRoles("admin"), OrderController.getAllOrders)
    app.put("/api/admin/orders/:id",isAuthenticated,authorizedRoles("admin"), OrderController.updateOrder)
    app.delete("/api/admin/orders/:id",isAuthenticated,authorizedRoles("admin"), OrderController.deleteOrder)   
}