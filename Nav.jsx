import React ,{useState} from 'react'
import css from './Nav.css'
import {Link, useNavigate} from 'react-router-dom'
import {FaBars , FaTimes, FaHome, FaUserCircle} from 'react-icons/fa'

const Nav = () => {
   
    const [icon,setIcon]=useState(false)
    const navigate=useNavigate();

   const handleClick=()=>{
    setIcon(!icon)
   }
   const closeSide=()=>{
    setIcon(false)
   }
   const username= localStorage.getItem('user.username');

const handleUserIconClick=()=>{
    if(username){
        navigate('/user')
    } else {
        navigate('/resister')
    }
}
  return (
    <>
    <nav className='navbar'>
        <Link to={'/'} className='nav-logo' onClick={closeSide}><FaHome className='fa-times'></FaHome></Link>
        <div className='menu-icon' onClick={handleClick}>
            {
                
            icon?<FaTimes className='fa-times'></FaTimes>:<FaBars className='fa-bars'></FaBars>
            }
        </div>
        <ul className={
            icon? 'nav-menu active':
            'nav-menu'
        }>
        <li>
            <Link to={'/'} className='nav-links'onClick={closeSide}>Home</Link>
        </li>
        <li>
            <Link to={'/about'} className='nav-links'onClick={closeSide}>About</Link>
        </li>        
        <li>
            <Link to={'/letsgo'} className='nav-links'onClick={closeSide}>Let's Go</Link>
        </li>
        <li>
            <Link to={'/career'} className='nav-links'onClick={closeSide}>Career</Link>
        </li>
        {username ? (
            <li onClick={closeSide}>
                <div className="nav-links user-icon" onClick={handleUserIconClick}>
                    <FaUserCircle className='fa-user-circle'/>
                </div>
            </li>
        ) : (
            <li>
                <Link to={'/resister'} className="nav-links" onClick={closeSide}>
                Sign Up
                </Link>
            </li>
        ) }
        </ul>
    </nav>
    </>
)
}

export default Nav
