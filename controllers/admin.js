const Admin = require("../model/admin.model")
// Relative Path

const getRegisterAdmin = (req, res, next) => {
    res.sendFile(`${__dirname}/public/register-admin.html`)
}

const postRegisterAdmin = async(req,res,next) => {
    const name = req.body.name
    const pwd = req.body.password
    const admin = new Admin({
        name: name,
        password: pwd
    })
    const savedadmin = await admin.save()
    return res.send(`${name} is Registerd`)
}

const getLoginAdmin = (req,res,next) => {

    if(req.cookies.isAuthenticated){
        return res.redirect("/all-feedback")
    }
    res.sendFile(`${__dirname}/public/admin-login.html`)
}

const postLoginAdmin =  async(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        name: username,
        password: password
    })

    if(admin.length > 0){
        res.cookie("isAuthenticated", true)
       return res.redirect('/all-feedback')
    }
    res.send("Unauthorized User")
}

const postLogout = (req,res,next) => {
    res.clearCookie("isAuthenticated")
    return res.redirect("/admin")
}

module.exports = {getRegisterAdmin, getLoginAdmin, postRegisterAdmin, postLoginAdmin, postLogout}