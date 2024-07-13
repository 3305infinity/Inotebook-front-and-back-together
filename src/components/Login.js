import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'//to navigate to other side after using correct credentials
import NoteContext from '../Context/Notes/Notecontext';
const Login = () => {
  let navigate=useNavigate();
  const [user,setUser]=useState({email: '',password: ''})
  const context=useContext(NoteContext)
  const {showAlert}=context;
  const onChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
            const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:user.email,password:user.password})
          })       
          const json=await response.json();
          //USE JSON SUCCESS HERE whtether the api has fetched properly or not 
          if(json.authtoken)
            {
              //redirect
              localStorage.setItem('authtokenjwt',json.authtoken)// write the name how it is being passed from json ullu
              // i wated my half day on this cry cry
              // dont write authtokenjwt here coz in this u are sending it through authtoken through this api so its json has
              // has it in the nmae of authtoken
              e.preventDefault(); 
              navigate('/', { replace: true });
              // window.location.href="/"
              console.log("login authtokenjwt is  "+localStorage.getItem('authtokenjwt'))//)
              showAlert('success','Logged in Successfully')
            }
            else{              
              showAlert('danger','Invalid Credentials')
            }  
  }
  return (
    <>
    <div className="container mx-5 my-5">
      <h1>Login to your Account </h1>
    <form >
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
      <input type="text" onChange={onChange} value={user.email} className="form-control" id="email" name="email"  />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
      <input type="password"  onChange={onChange} value={user.password} className="form-control" id="password" name="password" />
    </div>
      <button onClick={handleSubmit} type="submit"  className="btn btn-primary">Submit</button>
    </form>
    </div>
    </>
  )
}
export default Login


