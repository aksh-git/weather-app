import React from 'react'

function Wcard({icon ,day, tempmin, tempmax, main}) {

  const weekNames = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

  return (
    <div className='w-card'>
      <div className='wc-wrap'>
        <span className='day'>{weekNames[day]}</span>
        <div className='image-wrap'><img src={icon} alt='icon' height={100} width={100} /></div>
        <span className='temp'>{tempmin}&deg; | {tempmax}&deg;</span>
      </div>
    </div>
  )
}

export default Wcard