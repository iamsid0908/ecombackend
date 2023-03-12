const { isAuthenticated ,authorizedRoles} = require("../../middleware/auth");
const userControllers=require("../controller/userControllers")

module.exports=app=>{
    app.delete("/api/deleteprofile/:id",isAuthenticated, authorizedRoles("admin"), userControllers.deleteProfile);
    app.put("/api/updaterole/:id",isAuthenticated, authorizedRoles("admin"), userControllers.updateUserRole);
    app.post("/api/register", userControllers.userRegister);
    app.post("/api/login",userControllers.userLogin);
    app.get("/api/logout",userControllers.userLogout);
    app.post("/api/password/reset",userControllers.forgotPassword);
    app.get("/api/user",isAuthenticated, userControllers.getUserDetails);
    app.put("/api/updatepassword",isAuthenticated, userControllers.updatePassword);
    app.put("/api/updateprofile",isAuthenticated, userControllers.updateProfile);
    app.get("/api/getallusers",isAuthenticated, authorizedRoles("admin"), userControllers.getAllUsers);
    app.get("/api/getsingleuser/:id",isAuthenticated, authorizedRoles("admin"), userControllers.getSingleUsers);
}