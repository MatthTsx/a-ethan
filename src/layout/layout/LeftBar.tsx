import React from 'react'
import { geralProps } from '~/libs/interfaces/geralProps'
import CloseOpen from '../components/LeftBar/CloseOpen';
import TabContainer from '../components/LeftBar/TabContainer';

interface props extends geralProps{}

function LeftBar({...props} : props) {
    const [showing, setShow] = React.useState(false);

  return (
    <div className='bg-black p-1.5 transition-all overflow-hidden' style={{width: showing? "15em" : "4em"}}>
        <CloseOpen Open={showing} func={setShow}/>
        <TabContainer {...props} show={showing}/>
    </div>
  )
}

export default LeftBar