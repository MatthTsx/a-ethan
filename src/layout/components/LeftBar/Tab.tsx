import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { geralProps } from '~/libs/interfaces/geralProps'

interface props extends geralProps{
  text: string
  Path: string
  icon: string
  show: Boolean
}

function Tab({...props} : props) {
  return (
    <Link className='flex rounded-full opacity-75 hover:opacity-100 transition-all items-center gap-x-2
    scale-[0.975] hover:scale-100 hover:bg-white/5' href={props.Path}>
        <div className='w-12 h-12 flex items-center justify-center bg-purple rounded-full flex-shrink-0 overflow-hidden'>
          {/* @ts-ignore */}
          <FontAwesomeIcon icon = {props.icon}
          className='rounded-full w-9 h-9 flex-shrink-0 text-lightGolden'/>
        </div>
        {props.show &&
          <p className='text-purple font-semibold'>
              {props.text}
          </p>
        }
    </Link>
  )
}

export default Tab