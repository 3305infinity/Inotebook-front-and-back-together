import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/Notecontext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getnotes ,editnotes,showAlert} = context;
  const [notesy,setNotesy]=useState({
   eid:'', etitle:'',edescription:'',etag:''
  })
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getnotes();
    }
    else
    {
      navigate('/login', { replace: true });
    }
  }, [])
  const modalref=useRef(null);
  const closeref=useRef(null);
  const updatenotes=(notes)=>{
    modalref.current.click();
    setNotesy({eid:notes._id,etitle:notes.title,edescription:notes.description,etag:notes.tag})
  }
  const onChange=(e)=>{
    setNotesy({ ...notesy,[e.target.name]:e.target.value});
  }
  const handleClickModal=(e)=>{
    e.preventDefault();// very imp otherwise the page gets reloaded and your progress disappears
    editnotes(notesy.eid,notesy.etitle, notesy.edescription, notesy.etag);
    closeref.current.click();
    showAlert("success","Updated Successfully");
      // getnotes();
  }
  return (
    <>
      <button style={{display:'none'}} ref={modalref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Notes
      </button>
      <div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form action="">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input onChange={onChange} minLength={5} required  type="text" value={notesy.etitle}  className="form-control" id="etitle" name="etitle" />
                </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                <input onChange={onChange} minLength={5} required type="text" value={notesy.edescription}   className="form-control" id="edescription" name="edescription" />
                </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                <input onChange={onChange} type="text" value={notesy.etag}  className="form-control" id="etag" name="etag"/>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button  ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={notesy.etitle.length<5||notesy.edescription.length<5} type="button" onClick={handleClickModal}  className="btn btn-primary">Update Changes</button>
            </div>
          </div>
    </div>
    </div>
    <h1>Your Notes</h1>
      {notes.length?<div className="row my-3">
        {notes.map((notes) => {
          return <Noteitem key={notes._id}  updatenotes={() => updatenotes(notes)} notes={notes}/>
          // updatenotes={() => updatenotes(notes)}use this not updatenotes={updatenotes}
        })}
      </div>:
      <div>
        <p>No Notes to show</p>
      </div>
      }
    </>
  )
}
export default Notes
 