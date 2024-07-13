import React from 'react'
import Addnote from './Addnote'

import Notes from './Notes'

const Home = () => {
  return (
    <>
        <Addnote/>
        <div className="container my-5">
        <Notes/>
        </div> 
    </>
  )
}

export default Home
