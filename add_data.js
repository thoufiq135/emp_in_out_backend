const express=require("express");
const route=express.Router()
const {empmodel,datamodel}=require("./mongodb");
const { default: mongoose } = require("mongoose");
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
}
const check=async(req,res,next)=>{
const{Name,IP,Service}=req.body
console.log(req.body)

try{
    const empdata=await empmodel.findOne({IP:IP})
    if(empdata&&empdata.Name==Name){
       console.log(Name)
console.log(IP)
console.log(Service)
    }else{
        await empmodel.insertMany({Name:Name,IP:IP})
        
    }
    next()
}catch(e){
    console.log(e)
     res.status(500).json({ error: "Internal Server Error in check middleware" });
}
}
route.post("/",check,async(req,res)=>{
    const{Name,IP,Service}=req.body
const  todate=getTodayDate()
const currenttime=new Date().toLocaleTimeString()
try{
    const id=await empmodel.findOne({
        IP:IP
    })
    if(IP){
        try{
            const doc=await datamodel.findOne(
                {
                    EMP_id:id._id,
                    date:todate

                }
            )
            if(!doc){
                const newdata={
                    EMP_id:id._id,
                    date:todate,
                    logs:[
                        {
                            status:Service,
                            time:currenttime

                        }
                    ]
                }
                await datamodel.create(newdata)
            }else{
                doc.logs.push({
                     status:Service,
                            time:currenttime
                })
                await doc.save()
            }

        }catch(e){
            console.log(e)
        }
    }
}catch(e){
    console.log(e)
}
})
module.exports=route;