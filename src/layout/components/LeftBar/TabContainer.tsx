import React from 'react'
import Tab from './Tab'
import { geralProps } from '~/libs/interfaces/geralProps'
import UserProfile from './UserProfile'
import Tabs from '~/utils/constants/Tabs'

interface props extends geralProps{
  show: Boolean
}

function TabContainer({...props} : props) {
  return (
    <div className='w-full overflow-hidden mt-16 flex flex-col h-full gap-y-5'>
      {Tabs.map((T,i) => (
        <Tab {...props} key={i} {...T}/>
      ))}
        <UserProfile {...props}/>
    </div>
  )
}

export default TabContainer