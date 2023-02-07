const express = require("express")
const app = express()


// STRINGIFIED
// Middleware which makes json data to process by server
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Method

// GET POST 

const users = [{
    user: "user",
    password: "123"
}, {
    user: "User2",
    password: "Password2"
}, {
    user: "User1",
    password: "Password2"
}]

const authenticationMiddleware = (req, res, next) => {
    const username = req.body.name;
    const password = req.body.password;
    
    const user = users.find(function(u){
        return u.user === username && u.password === password
    }) 

    if(!user){
       return  res.send("Unauthourized")
    }


    // User authencticate
    req.user = {
        username: username,
        password: password
    }    

    next();

}

app.get("/", (req,res, next) => {
    res.send("<h1>Welcome to the server</h1>")
})


app.get("/login", (req, res, next) => {
    res.send(`
        <form action="/auth" method="POST">
            <input name="name" placeholder="Enter Your name" type="text"/>
            <input name="password" placeholder="Password" type="password"/>
            <button type="submit">Submit</button>
        </form>
    `)
}) 

app.post("/auth", authenticationMiddleware, (req, res,next) => {  
    res.send(`${req.user.username} is authenticated`)
})


app.listen(3000, () => console.log("server started"))