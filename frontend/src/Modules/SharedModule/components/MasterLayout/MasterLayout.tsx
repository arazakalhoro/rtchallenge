import React from 'react'
import Styles from "./MasterLayout.module.css"
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
<>
      <Navbar/>
 <div className={`${Styles.masterMain} d-flex`}>
        <div>
          <SideBar/>
        </div>
        <div className={`${Styles.greybackground} w-100 overflow-aut p-1 p-md-3 darkMood-MasterLayout`}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
