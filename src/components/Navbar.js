import React from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


function NavbarComp() {
  return (
      <Navbar fluid collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand >
        <Link to="/" className="navbar-brand">Exercise Tracker</Link>
      </Navbar.Brand>
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to='/' >
            <NavItem className='navDesign'>Exercises</NavItem>
          </LinkContainer> */}
          <LinkContainer to='/create'>
            <NavItem  className='navDesign'>New Exercise</NavItem>
          </LinkContainer>
          <LinkContainer to='/user'>
            <NavItem className='navDesign'>New User</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


    // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    //   <Link to="/" className="navbar-brand">
    //     Exercise Tracker
    //   </Link>
    //   <div className="collpase navbar-collapse" id="myNavbar">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="navbar-item">
    //         <Link to="/" className="nav-link">
    //           Exercises
    //         </Link>
    //       </li>
    //       <li className="navbar-item">
    //         <Link to="/create" className="nav-link">
    //           Create Exercise
    //         </Link>
    //       </li>
    //       <li className="navbar-item">
    //         <Link to="/user" className="nav-link">
    //           Create User
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default NavbarComp;
