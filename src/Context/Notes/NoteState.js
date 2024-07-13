import React,{useState} from "react";
import NoteContext from "./Notecontext";
const NoteState =(props)=>{
    const host="http://localhost:5000/"
    const notesy=[];    
    const [alert,setAlert]=useState(false)
    const [alertvalue,setAlertValue]=useState({value:'',msg:''})
    const showAlert=(alert,msg)=>{
       setAlertValue({value:alert,msg:msg})
       setAlert(true)
       setTimeout(()=>{
        setAlert(false)
      },2000)
    }
    const [notes,setNotes]=useState(notesy)
         //Get all notes
         const getnotes=async()=>{
          console.log("getnotes authtokenjwt"+localStorage.getItem('authtokenjwt'))
           try{const response=await fetch(`${host}api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "authtokenjwt":localStorage.getItem('authtokenjwt')           }
           })
            const json=await response.json()
            if(json)
            {
              setNotes(json)
            }
            else{
              showAlert("danger","something went wrong")
            }}
            catch(error)
            {
              console.log("this motherfucker Notestate getnote is not working    "+error)
            }
        }
      //Add a note
        const addnotes=async(note,title,description,tag)=>{
        const response=await fetch(`${host}api/notes/addnotes`, {
            method: 'POST',
            headers: {
              "Content-Type":"application/json",
              "authtokenjwt":localStorage.getItem('authtokenjwt')           },
            body:JSON.stringify({title,description,tag})            
          });
          const notesy=await response.json();
        setNotes(notes.concat(notesy))
      }
      // Delete  a note 
      const deletenotes=async(id)=>{
        const response=await fetch(`${host}api/notes/deletenotes/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                "authtokenjwt":localStorage.getItem('authtokenjwt')           }
        })
        const newnotes=(notes.filter((notes)=>
        {
            return notes._id!==id;
        }))
        setNotes(newnotes)
      }
      //Edit a Note
      const editnotes=async(id,title,description,tag)=>{
        const response=await fetch(`${host}api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
              "Content-Type":"application/json",
              "authtokenjwt":localStorage.getItem('authtokenjwt')           },
            body:JSON.stringify({title,description,tag})
          });
          const newnotes=JSON.parse(JSON.stringify(notes));
          const json=await response.json();
            for(let i=0;i<notes.length;i++)
                {
                  if(newnotes[i]._id===id)
                  {
                      newnotes[i].title=title;
                      newnotes[i].description=description;
                      newnotes[i].tag=tag;
                      break;
                   }
                }
                setNotes(newnotes);
    }
    return (
        <NoteContext.Provider value={{notes,addnotes,deletenotes,editnotes,getnotes,alert,setAlert,alertvalue,setAlertValue,showAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;





