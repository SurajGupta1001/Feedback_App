const express = require("express")
const app = express()


// function middleware1 (req,res, next){
//     console.log(`Middleware 1`)
//     next()
// }
// function middleware2 (req,res, next){
//     console.log(`Middleware2`)
//     next(); 

// app.use(middleware1)
// app.use(middleware2)
// }
function middleware2 (req,res, next){
    console.log(`${req.method} ${req.url}`)
    next(); 
}

app.use(middleware2)

// app.use()

// app.get("/", middleware1 , middleware2, middleware3, middleware4)

app.get("/", (req, res, next) => {
    res.send("Route is /")
})


app.get("/middleware", (req,res,next) => {
    console.log("1st middleware from /middleware")
    next()
}, (req,res,next) => {
    console.log("2nd middleware from /middleware")
    next()
},(req,res,next) => {
    res.send("Hellow world from middleware")
})

app.get("/about", (req,res,next) => {
    res.send("Route is /about")
})






app.listen(3000, () => console.log("server started"))