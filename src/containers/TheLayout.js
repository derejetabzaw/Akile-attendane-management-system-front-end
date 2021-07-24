import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div  style={{ background: '#421716'}}>
      <TheSidebar/>
      <div className="c-wrapper" >
        <div className="c-body" >
        <TheHeader />
          <TheContent/>
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  )
}

export default TheLayout
