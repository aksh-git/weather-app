import React from 'react'

function Loader({color,text}) {
  return (
    <div className='loader'>
      <div className='center wrap'>
        <div style={{color:color}} className=" lds-spinner">
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
          <div style={{color:color}}></div>
        </div>
        <span style={{color:color,fontSize:'1.234rem',fontWeight:'600'}}>Loading<br/>{text}</span>
      </div>
    </div>
  )
}

export default Loader