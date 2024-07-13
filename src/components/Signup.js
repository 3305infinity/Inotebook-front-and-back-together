import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/Notecontext';
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  let context=useContext(NoteContext);
  let {showAlert}=context;
  let navigate=useNavigate();
  const [user,setUser]=useState({name:'',email:'',password:'',cpassword:''})
  const handlesubmit=async()=>{
    try{const response=await fetch('http://localhost:5000/api/auth/createUser',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:user.name,email:user.email,password:user.password})
    })
    const json=await response.json();
    console.log("authtokenjwtis in the json is "+json)
    if(json)
      {
        showAlert('success',"Registration Successfull")
        localStorage.setItem('authtokenjwt',json.authtokenjwt)
        navigate('/',{replace:true})
        console.log("authtokenjwt is"+localStorage.getItem('authtokenjwt'))
      }
      else{
        showAlert('danger',"Sorry ! Registration Failed")
      }}
      catch(error)
      {console.log("signup not working   "+error)}
  }
  const onChange=(event)=>{
    setUser({...user,[event.target.name]:event.target.value})
  }
  return (
    <>
      <div className="container">
        <h1>Create an Acccount to use INotebook</h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="email" className="form-control" onChange={onChange} id="name" name="name" value={user.name} placeholder="Enter your name here" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control"  onChange={onChange}  id="email" name="email" value={user.email}  placeholder="Enter your email here" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control"  onChange={onChange}  id="password" name="password" value={user.password}  placeholder="Enter your password here" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control"  onChange={onChange}  id="cpassword" name="cpassword" value={user.cpassword}  placeholder="Enter your password here" />
        </div>
        <button onClick={handlesubmit} className='btn btn-primary'>Register</button>
      </div>
    </>
  )
}
export default Signup
