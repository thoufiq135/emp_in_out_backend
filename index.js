const Express=require("express");
const cors=require("cors")
const app=Express()
app.use(cors());
const login=require("./add_data.js")
const logout=require("./logout.js")
app.use(Express.json())
const{connectdb}=require("./mongodb.js")
connectdb()
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})
app.use("/login",login)
app.use("/logout",logout)
app.listen("5000",()=>{
console.log("server is working on port 5000")
})