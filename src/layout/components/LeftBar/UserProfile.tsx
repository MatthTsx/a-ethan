import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { geralProps } from '~/libs/interfaces/geralProps'

interface props extends geralProps{
  show: Boolean
}

function UserProfile({...props} : props) {
  return (
    <Link className='flex rounded-full opacity-75 hover:opacity-100 transition-all items-center gap-x-2
    scale-[0.975] hover:scale-100 hover:bg-white/5' href={"/profile/" + props.session.user.id}>
        <Image src={props.session.user.image as string}
        alt='profile' width={40} height={40}
        className='rounded-full w-12 h-12 flex-shrink-0'/>
        {props.show &&
          <p className='text-purple font-semibold'>
              {props.session.user.name}
          </p>
        }
    </Link>
  )
}

export default UserProfile