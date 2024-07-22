import { useState } from 'react'
import './App.css'
import SideBar from './Components/SideBar'
import HomeFilterPage from './Pages/HomeFilterPage'
import PropertyPage from './Pages/PropertyPage'
import CreateNewProperty from './Pages/CreateNewProperty'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import EditPage from './Pages/EditPage'
import logo from "./assets/logo.png";

function App() {
  return (
    <BrowserRouter>
    <div className="flex bg-white h-screen overflow-y-hidden">
      <div className="">
        <SideBar />
      </div>
      <div
       className="w-full">
        {/* <div className='w-full flex flex-row justify-center'>
        <img src={logo} alt="" className=' mt-0 pt-0' width={100} height={50} />
      </div> */}
        <div className='w-full h-[100%]'>
        <Routes>
        <Route path="/" element={ <HomeFilterPage />} />
        <Route path="/property" element={ <PropertyPage/> } />
        <Route path="/create/property" element={ <CreateNewProperty/> } />
        <Route path="/edit/property/:id" element={ <EditPage/> } />
      </Routes>
        </div>

      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
