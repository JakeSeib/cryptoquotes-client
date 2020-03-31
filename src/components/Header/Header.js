import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

// const authenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#change-password">Change Password</Nav.Link>
//     <Nav.Link href="#sign-out">Sign Out</Nav.Link>
//   </Fragment>
// )

// const authenticatedOptions = (
//   <DropdownButton id="dropdown-basic-button" title="Dropdown button">
//     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//   </DropdownButton>
// )

const authenticatedOptions = (
  <DropdownButton id="dropdown-basic-button" variant="secondary" alignRight title="Options">
    <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
    <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
    <Dropdown.Item href="#quotes">Browse Quotes</Dropdown.Item>
    <Dropdown.Item href="#quotes/create">Create a Quote</Dropdown.Item>
  </DropdownButton>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link to="/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand={user ? true : 'md'}>
    <Navbar.Brand href="#">
      Cryptoquotes
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
