import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav as Navs,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar-m" light expand="md">
        <NavbarBrand>
          <h3>Medicare</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Navs className="me-auto" navbar>
            <NavItem>
              <NavLink>เกี่ยวกับเรา</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>ติดต่อ</NavLink>
            </NavItem>
          </Navs>
        </Collapse>
        <NavbarText className="mr-2">
          <button class="nav-icon-circle box-shadow">G</button>
        </NavbarText>
        <NavbarText>
          <div class="login-dropdown">
            <button class="login-dropbtn box-shadow">WL</button>
            <div class="login-dropdown-content">
              <span>Profile</span>
              <span>Settings</span>
            </div>
          </div>
        </NavbarText>
      </Navbar>
    </div>
  );
}
