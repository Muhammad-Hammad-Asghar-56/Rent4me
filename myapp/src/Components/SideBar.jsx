import React from 'react'
import logo from "../assets/houseLogo.png";
import dashboard from "../assets/dashboard.svg"
import house from "../assets/house.svg"
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [selected,setSelected]=React.useState("Dashboard");
  return (
    <div className='flex flex-col mr-10 gap-2 justify-center items-center w-full'>
        <div className='flex flex-row justify-center  my-5'>
          <img className='w-[40px]' src={logo} alt="" />
        </div>
        <Link to={"/"} className={`w-full flex items-center ${selected==="Dashboard"? "border-l-4 border-navy":""}`}>
          <img className='p-1' src={dashboard} onClick={()=>setSelected("Dashboard")} alt="" width={40} height={40}/>
          <p>Dashboard</p>
        </Link>
        <Link to={"/property"}  className={` w-full flex  items-center ${selected==="House"? "border-l-4 border-navy":""}`}>
          <img className='p-1' src={house} onClick={()=>setSelected("House")} alt="" width={40} height={40} />
          <p>Properties</p>
        </Link>

    </div> 
  )
}

export default SideBar
