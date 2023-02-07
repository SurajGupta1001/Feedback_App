const express = require("express")

const app = express()



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

app.get('/', (req, res) => {
    res.json(obj)
})


app.get('/html', (req,res) => {

})

app.get("/about", (req,res) => {
    res.send("About ")
})

app.get("/contact", (req,res) => {

    

    res.send("<h1>Contact</h1>")
})




app.listen(3000, () => console.log("Server started at http://localhost:3000"))