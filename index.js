const express = require("express")

const app = express()

// Handle static files
app.use(express.static("public"))
// Handle json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const obj = [
    {
        name: "max",
        age: 100
    },
    {
        name: "jhon",
        age: 23
    }
]

app.get("/", (req,res, next) => {
    res.sendFile(`${__dirname}/public/index.html`)
})




app.listen(3000, () => console.log("Server started at http://localhost:3000"))