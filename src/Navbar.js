import React/*, { useState }*/ from 'react';
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';

const NavbarPage = (props) => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="navbar">
      <Navbar light expand="md">
        {/* <Collapse isOpen={isOpen} navbar> */}
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/lobby">Findine</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Logout</NavLink>
            </NavItem>
          </Nav>
        {/* </Collapse> */}
      </Navbar>
    </div>
  );
}

export default NavbarPage;
