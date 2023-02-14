const express = require("express")

const router = express.Router();
const adminController = require("./controllers/admin.js")




router.post("/logout", adminController.postLogout )
router.post("/register", adminController.postRegisterAdmin)
router.get("/admin", adminController.getLoginAdmin)
router.post('/admin/login', adminController.postLoginAdmin)




module.exports = router;