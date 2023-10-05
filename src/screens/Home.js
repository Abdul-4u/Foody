import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Ccard from '../components/Ccard'
import Carousal from '../components/Carousal'



export default function Home() {
    return (
        <div>
            <div><Navbar /></div>
           <div> <Carousal/></div>
          <div className='m-3'>

          <Ccard/>
          <Ccard/><Ccard/><Ccard/><Ccard/>
          </div>
            <div><Footer /></div>
        </div>
    )
}
