const express=require('express');
const app=express()
const bcrypt=require('bcrypt')
app.use(express.json())
const users=[]
app.get('/users',(req,res)=>{
    res.json(users)
});
app.post('/',async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const user={name:req.body.name,password:hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send()
    }
    
});
app.post('/',async(req,res)=>{
    const user=users.find(user.name=req.body.name)
    if(user==null){
        return res.status(400).send('cannot find user')
    }
    try{
      if(await bcrypt.compare(req.body.password,user.password)){
          res.send('succes')
      }else{
          res.send('not allowed')
      }

    }catch{
        res.status(500).send()

    }
});