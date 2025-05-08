import React from 'react'
import Left from '../components/HomePage/Left'
import Middle from '../components/HomePage/Middle'
import Right from '../components/HomePage/Right'


function HomePage() {

  const fullAppStyle = {
    height: '100dvh',
    width: '100dvw',
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  };

  return (
    <div style={fullAppStyle}>
        <Left/>
        <Middle/>
        <Right/>
    </div>
  )
}

export default HomePage


