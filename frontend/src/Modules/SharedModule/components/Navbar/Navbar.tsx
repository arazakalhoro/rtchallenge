import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import navLogo from "../../../../assets/images/nav-logo.png";
import navImg from "../../../../assets/images/8550fbcbe60cd242d12760784feff287.jpeg";
import navStyle from "./Navbar.module.css";
import { useAuth } from '../../../Context/AuthContext';
import styles from "../MasterLayout/MasterLayout.module.css"
import { useState, useEffect } from "react";
import SideBar from '../SideBar/SideBar';
import SideBarStyle from '../SideBar/sidebar.module.css';
import SideBarMobile from '../SideBar/SideBarMobile';
import { Link } from 'react-router-dom';
export default function CustomNavbar() {
  let [collapsedWidth, setCollapsedWidth] = useState("0px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("100%");
    } else if (width <= 768) {
      setCollapsedWidth("80px");

    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);
    return () => window.removeEventListener('resize', updateCollapsedWidth);
  }, []);

  const { loginUser,ChangePassword } = useAuth();

  return (
    <>
      <Navbar expand="md" className={`${styles.nav} p-1 shadow-sm navber-darkmood`}>
        <Container>

          <Navbar.Brand>
            <img src={navLogo} className='w-na bg-dange' alt="" />
            
          </Navbar.Brand>

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <div className={SideBarStyle.sidebarMobile}>
            <nav className="navbar bg-body-tertiary fixed-top">
              <div className="container-fluid">
                <Navbar.Brand>
                  <img src={navLogo} className='w-na bg-dange' alt="" />
                  
                </Navbar.Brand>
                <SideBarMobile/>
              </div>
            </nav>
          </div>
        </Container>
      </Navbar>
    </>
  )
}
