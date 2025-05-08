import React from 'react'
import Icons from './LeftComponents/Icons';


function Left() {

  const Lefts ={
    Left: {
      height: '100%',
      width: '5%',
    },
  }


  return (
    <div style={Lefts.Left}>
       <Icons/>
    </div>
  )
}

export default Left



