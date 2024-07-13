import React ,{useContext} from 'react'
import NoteContext from '../Context/Notes/Notecontext';
const Alert = () => {    
  let context=useContext(NoteContext);
  let {alert,alertvalue}=context;
  return (
    <>
      {alert && <div className={`alert alert-${alertvalue.value}`} role="alert">{alertvalue.value} : {alertvalue.msg}</div>}
      </>
  )
}

export default Alert
