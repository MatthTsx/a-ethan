import React from 'react'

interface props{
    width: string,
    height: string,
    type: number,
    qntd?: number
}

function Loading({...props} : props) {
  return (
    <div style={{
        width: props.width,
        height:props.height
    }}
    className='flex w-full h-36 p-2 gap-4 rounded-md scale-95 opacity-100
    transition-all items-center animate-pulse duration-200
    bg-gradient-to-tr from-neutral-900/60 to-neutral-900'>
        {props.type == 1 && Circle()}
        {props.type == 2 && Normal()}
    </div>
  )
}

function Circle(){
    return (
        <div className='border-8 rounded-full w-16 h-16 border-black border-b-purple animate-spin ml-2'/>
    )
}

function Normal(){
    return(
        <div>
            A
        </div>
    )
}

export default Loading