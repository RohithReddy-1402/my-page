const { urlencoded } = require('body-parser');
const express=require('express')
const mongoose=require('mongoose');
var bodyParser=require("body-parser")
const { type } = require('os');
const { password } = require('pg/lib/defaults');
const { emitWarning } = require('process');
const app=express();
const PORT=4500;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://127.0.0.1:27017/my-data')
const userSchema =new mongoose.Schema({
    Username:{
        type:String,
        required:true
    } ,
    email :{
        type:String,
        required:true,
        
    } ,
    password:{
        type:String,
        required:true,
    } ,
    passConf:{
        type:String,
        required:true
    }
})
const User = mongoose.model('users',userSchema);
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))
app.post('/sign_up',async(req,res)=>{
    const user =await User({
        Username:req.body.Username,
        email:req.body.email,
        password:req.body.password,
        passConf:req.body.passConf,
    })
    while(user.password!==user.passConf){
        
        return res.redirect('sign.html');
        
    }
    db.collection('users').insertOne(user,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    
    return res.redirect('login.html')
})
app.post('/login',async(req,res)=>{
    try{
        
        const user =await User.findOne({Username:req.body.Username})
        
        if(user){
            const result=(req.body.password===user.password);
            if(result){
                return res.redirect('home.html');
            }else{
                res.status(401).send("try the password again")
                return redirect('login.html');
            }
        }
        else{
            return res.redirect('login.html')
        }   
    }
    catch(error){
        res.status(401).json({error})
    }
})
app.listen(PORT,()=>console.log(`Server started in PORT :${PORT}`));