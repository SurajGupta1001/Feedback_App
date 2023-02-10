const authMiddleware = (req,res,next) => {
    const isAuthenticated = req.cookies.isAuthenticated;
    if(isAuthenticated){
        next();
    }else{
        return res.send("Unauthorised User")
    }
}

module.exports = authMiddleware