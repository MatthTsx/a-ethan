import React from 'react'
import Head from 'next/head'

interface props{
    name: string
}

function Header({...props} : props) {
  return (
    <Head>
        <title>{props.name}</title>
    </Head>
  )
}

export default Header