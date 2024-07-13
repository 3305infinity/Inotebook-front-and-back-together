import React,{useContext} from 'react'
import NoteContext from '../Context/Notes/Notecontext';

const Noteitem = (props) => {
    const {notes,updatenotes}=props;//destructoring
    const context=useContext(NoteContext)
    const {deletenotes}=context;
    const handleDelete=()=>{
           deletenotes(notes._id)
    }
    return (
        <>
            <div className="col-md-3  ">
            <div className="flex ">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
                    <p className="card-text">{notes.description}</p>
                    <p className="card-text">{notes.tag}</p>
                    <div className="icons" style={{display:'flex',justifyContent:'flex-start'}}>
                    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={updatenotes} ></i>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default Noteitem
