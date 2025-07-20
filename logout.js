const express=require("express");
const route=express.Router()
const {empmodel,datamodel}=require("./mongodb")
const check=async(req,res,next)=>{
const {IP}=req.query
console.log(IP)
if(IP){
    const exists=await empmodel.findOne({IP:IP})
    if(!exists){
        res.status(401).json({message:"Not found"})
    }
}
next()
}
route.get("/",check,async(req,res)=>{
const {IP}=req.query
if(IP){
    const exists=await empmodel.findOne({IP:IP})
    if(exists){
        const data=await datamodel.findOne({EMP_id:exists._id})
        res.status(200).json({date:data.date,name:exists.Name,
            logs:data.logs.map(log=>({
                status:log.status,
                time:log.time
            }))
        })
    }
}
})
module.exports=route;