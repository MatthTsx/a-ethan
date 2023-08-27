import React from 'react'

interface props {
    Open: Boolean,
    func: React.Dispatch<React.SetStateAction<boolean>>
}

function CloseOpen({...props} : props) {
    const stly = (multi: number) => ({
        rotate: props.Open && (45 * multi) + "deg",
        translate: props.Open && "0em " + (0.45 * multi) + "em"
    })

  return (
    <button className='flex absolute gap-1.5 flex-col w-8 h-6 mx-2 scale-95 transition-all top-5
    hover:scale-100' onClick={(e) => props.func((current) => !current)}>
        <div className='bg-lightGolden w-8 h-2 rounded-sm transition-all pointer-events-none' style = {stly(1)}/>
        <div className='bg-lightGolden w-8 h-2 rounded-sm transition-all pointer-events-none' style={stly(-1)}/>
    </button>
  )
}

export default CloseOpen