const express=require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fetchuser = require('../middleware/fetchuser');
const Notes =require('../models/Notes');
//===================================================================================================================
//ROUTE 1
// fetch all thenotes  api/notes/fetchallnotes using get 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
     try{
         const notes=await Notes.find({user:req.user.id})
         res.json(notes)  // res.json(notes)
     }
     catch(error)
     {
        console.log(error);
        res.status(500).send('Internal error occured')
     }
})
//===================================================================================================================
//ROUTE 2
//adding notes for the same particular user
router.post('/addnotes',[  
    body('title','enter a valid email').isLength({min:3}),
    body('description','enter a pswd dont leave it blank').isLength({min:3})
    ],fetchuser,async(req,res)=>{
    try{
       
       const {title,description,tag}=req.body;
       const  notes=new Notes({
       title,description,tag,user:req.user.id
       })
       const saveddata=await notes.save();
       res.json(saveddata);

    }
    catch(error)
    {  console.log(error);
       res.status(500).send('Internal error occured')
    }
})

//===================================================================================================================
//ROUTE 3
//adding notes for the same particular user
//for updation we use put requests
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
       //get these by destructuring from req.body
    const {title,description,tag}=req.body;
    try{
       const newnotes={};
       if(title){  newnotes.title=title;  }
       if(description){ newnotes.description=description; }
       if(tag){ newnotes.tag=tag; }       
       // find whether it is the same user who is trying to change the notes or any other check that first

        let note=await  Notes.findById(req.params.id)
       if(!note)
        { return res.status(404).json("404 not found")    }  
        if(note.user.toString()!==req.user.id)
        {  return res.status(401).json("unauthorized not allowed")  } 

       //find the note to be updated and update it 
       note=Notes.findByIdAndUpdate((req.params.id),{$set:newnotes},{new:true}).exec()
       // put exec( ) here otherwise it does not owrk 
       res.json(note)
    }
    catch(error)
    {  console.log(error);
       res.status(500).send('Internal error occured')
    }
})


//ROUTE 4
// deleting the existing  notes 
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
     try{
      let note= await Notes.findById(req.params.id)
     if(!note){
        return res.status(404).json("404 not found")    }
     if(note.user.toString()!=req.user.id)
      {
          return res.status(404).json("unathourized")
      }
      note=await Notes.findByIdAndDelete(req.params.id)
      res.json("successfully deleted")
      }
      catch(error)
      {
         console.log(error)
         res.status(500).send('Internal error occured')
      }
})
module.exports=router;