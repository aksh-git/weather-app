import React from 'react'

function ListCard({title, children}) {

  return (
    <div className='listcard'>
        <div className='lc-wrap'>
            <div className='header'>
                <span>{title}</span>
            </div>
            <div className='lc-data'>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ListCard