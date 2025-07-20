const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const connectdb=async()=>{
    try{
   await mongoose.connect(process.env.URI)
    console.log("connected to database")
}catch(e){
console.log("Error at connecting to database")
}
}
const emp_Schema=new mongoose.Schema({
    Name:String,
    IP:String
})
const logentry=new mongoose.Schema({
   
   status: { type: String, enum: ["login", "logout"], required: true },
  time: { type: String, required: true }
})
const empmodel=mongoose.model("EMP_Data",emp_Schema)
const data_schema=new mongoose.Schema({
EMP_id:{type:mongoose.Schema.Types.ObjectId,ref:"EMP_Data"},
 date:String,
logs:[logentry]
})
const datamodel=mongoose.model("data",data_schema)
module.exports={connectdb,empmodel,datamodel};