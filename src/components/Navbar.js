import React from 'react'
import { Link,useLocation ,useNavigate} from 'react-router-dom';

const Navbar = () =>   {  
  let location=useLocation()
    const navigate=useNavigate();
   
    const handlelogout=()=>{
     
      localStorage.removeItem('authtokenjwt')
      localStorage.removeItem('user')
      // window.location.href="/login"
      navigate('/login',{replace:true})

    }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="container-fluid">
      <a className="navbar-brand" href="/">iNoteBook</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
           <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
           <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('authtokenjwt') ?<div style={{display:'flex'}} >
      <div className="login mx-1" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:'1px'}}>
      <i className="fa-solid fa-user-plus">        
           <Link style={{fontSize:'10px'}} className={`nav-link ${location.pathname==='/login'?"active":""} `} aria-current="page" to="/login">Login</Link>
      </i>
      </div>
      <div className="signup mx-1" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'1px'}}>
      <i className="fa-solid fa-right-to-bracket">       
           <Link style={{fontSize:'10px'}} className={`nav-link ${location.pathname==='/signup'?"active":""} `} aria-current="page" to="/signup">SignUp</Link>
      </i>
      </div>
      </div>:
      <div>
      <i className="fa-solid fa-arrow-right-from-bracket" onClick={handlelogout}>LogOut</i>
      </div>}

      {/* </form> */}
    </div>
    </div>
    </nav>
    </>
  )
}
export default Navbar
