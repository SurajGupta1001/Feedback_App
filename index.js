
const express = require("express")

const app = express()

// This middleware 
app.use(express.static("public"))

// This middleware handle json data
app.use(express.json())
app.use(express.urlencoded({extended:false}))







app.listen(3000, () => console.log("Server started at http://localhost:3000"))