import React,{useContext,useState} from 'react'
import NoteContext from '../Context/Notes/Notecontext'
const Addnote = () => {
    const context=useContext(NoteContext)
    const {addnotes,showAlert}=context;
    const [notesy,setNotesy]=useState({
        title:"",
        description:"",
        tag:""

    })
    const onChange=(e)=>{
        setNotesy({...notesy,[e.target.name]:e.target.value});

    }
    const handleClick=(e)=>{
        e.preventDefault();// very imp otherwise the page gets reloaded and your progress disappears
        addnotes(notesy,notesy.title, notesy.description, notesy.tag);
        setNotesy({title: "", description: "", tag: ""});
        showAlert("success","Note Added Successfully")
    }
  return (
    <>
     <div className="container mt-3">
            <h1>Add a Note </h1>
            <form action="">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" minLength={5} required value={notesy.title} onChange={onChange} className="form-control" id="title" name="title" />
                </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                <input type="text" minLength={5} required value={notesy.description} onChange={(e)=>onChange(e)} className="form-control" id="description" name="description" />
                </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                <input type="text" value={notesy.tag} className="form-control" onChange={onChange} id="tag" name="tag" />
                </div>
                <button disabled={notesy.title.length<5||notesy.description.length<5} type="submit" onClick={(e)=>handleClick(e)} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    </>
  )
}

export default Addnote
