// for unique things we are checking here email only as we has mentioned email to be unique in User.js
const express=require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt =require('bcryptjs')
const User =require('../models/User')
var jwt = require('jsonwebtoken');
const jwt_secret="Fuck$you"
const fetchuser = require('../middleware/fetchuser');

//===================================================================================================================
//ROUTE 1
//Create a user using post: /api/auth/createUser Doesnt require auth No login required 
router.post('/createUser',[  // it is post request at  api/auth/createUser
   body('name','enter a valid name').isLength({min:3}),
   body('email','enter a valid email').isEmail(),
   body('password','enter a valid pswd').isLength({min:5})
] ,async(req,res)=>{
    // IF THERE ARE ERRORS RETURN BAD REQUEST 
    const errors=validationResult(req);
    if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
    // console.log(req.body)
    // const user=User(req.body);
    // user.save();
    try
    {//CHECK WHETHER A USER WITH SAME EMAIL ALREADY EXISTS OR NOT 
    // use await and let this resolve first the user then check it 
    let user=await User.findOne({email:req.body.email})
    if(user)
        {
            return res.status(400).json({error:'sorry use unique email'})
        }
        const salt=await bcrypt.genSalt(10)// prmoise returns a salt text to increase password protection
        const secpswd=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpswd
    })
    // as you use await async now no use of then
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'please enter a unique value for email',message:err.message})})
    const data={
        user:{
            id:user.id
        }
    }
     const authtokenjwt=jwt.sign(data,jwt_secret)
     console.log(authtokenjwt)
     //jwtsecret tells whether anyone has tempered with this or not 
     // is sent hiding other info 

    // THIS IS WHAT IS DISPLAYED IN THUNDERcLIENT SIDEBAR
    res.send({authtokenjwt})
}
catch(error){
    console.log(error.message)
    res.status(500).send("some error occured");
}
})

//===================================================================================================================
// ROUTE 2
//Authentication /api/auth/login Doesnt require auth No login required 
router.post('/login',[  // it is post request at  api/auth/createUser
    // body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','enter a pswd dont leave it blank').exists()
 ] ,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password }=req.body;
        try{
            let user=await User.findOne({email})
             if(!user){
                return res.status(400).json({error:"please enter correct credentials email"})
             }  
             const pswdcompare=await bcrypt.compare(password,user.password)
             if(!pswdcompare){
                return res.status(400).json({error:"please enter correct credentials pswd"})
             }

             const data={user:{
                id:user.id
             }}
             const authtoken= jwt.sign(data,jwt_secret)
             res.send({authtoken})// use curly braces so that it is send as json dont be foolish

        }catch(error){
            console.log(error.message)
            res.status(500).send("some error occured");
        }
 })

//===================================================================================================================
//ROUTE 3
// getting user detail no login required

router.post('/getUser',fetchuser ,async(req,res)=>{
    try{
    const user=await User.findById(req.user).select("-password");
    res.send(user);
    }catch(error){
        console.log(error.message)
        res.status(500).send({error:'Internal server error'})
    }
})
module.exports=router;
