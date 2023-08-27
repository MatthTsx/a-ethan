import React from 'react'

function Search() {
    const [Text, setText] = React.useState("");

  return (
    <div className='w-full h-16 p-1 items-center justify-center flex'>
        <div className='bg-white w-[60%] h-7 rounded-full flex items-center gap-4 px-4 justify-between mt-4 opacity-70
        hover:opacity-100 transition-all hover:scale-100 scale-[0.975]'>
            <input type="text" onChange={(e) => setText(e.target.textContent!)} placeholder='Search'
            className='outline-none bg-transparent w-full h-full px-4'/>
        </div>
    </div>
  )
}

export default Search