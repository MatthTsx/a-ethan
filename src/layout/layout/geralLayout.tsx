import React from 'react'
import { geralProps } from '~/libs/interfaces/geralProps'
import LeftBar from './LeftBar'

interface props extends geralProps{
    children: React.ReactNode
}

function GeralLayout({...props} : props) {
  return (
    <div className='flex h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        <LeftBar {...props}/>
        <div className="p-1.5 w-full h-full overflow-y-hidden">
          {props.children}
        </div>
    </div>
  )
}

export default GeralLayout