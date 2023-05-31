import {Outlet} from 'react-router-dom'
import React from 'react'
import Headers from './components/Headers'
export default function Layout(){
  return(
    <main>
      <Headers/>
      <Outlet />
    </main>
  )
}