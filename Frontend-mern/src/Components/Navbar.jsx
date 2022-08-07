import React,{useRef} from 'react'
import {Link} from "react-router-dom"

import {FaBars, FaTimes} from 'react-icons/fa';
import "./Navbar.css"


const Navbar = () => {
    const navRef = useRef();
   const showNavbar = ()=>{
    navRef.current.classList.toggle('responsive_nav'); // every time this function is called, we will add/remove i.e. toggle the responsive_nav class
   };

    return (
        <div>
            <header>
                <Link to="/">
                <a href="">MyEmployeeChart</a>
                </Link>
                <nav ref={navRef}>
                    <Link to="/create">
                    <a href="" id="a1">Create</a>
                    </Link>
                    <Link to="/">
                    <a href="">Home</a>
                    </Link>
                    <Link to="/view-chart">
                    <a href="">View Chart</a>
                    </Link>

                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                       <FaTimes/>
                    </button>
                </nav>
                     <button onClick={showNavbar} className='nav-btn'>
                        <FaBars/>
                     </button>
            </header>
        </div>
    )
}

export default Navbar;