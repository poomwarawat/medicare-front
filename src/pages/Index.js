import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  NavbarText,
} from "reactstrap";
import DoctorIcon from "../assets/images/doctorIcon.png";
import PhoneIcon from "../assets/images/phone.png";
import NurseIcon from "../assets/images/nurse.png";
import ChatIcon from "../assets/images/chat.png";
import Aos from "aos";
import Footer from "../components/Footer";
import SignInModal from "../components/Modal/SignInModal";
import { Link } from "react-router-dom";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  Aos.init();
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="top-screen">
        <Navbar expand="md" dark>
          <Container>
            <NavbarBrand>
              <h3>MEDICARE</h3>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Contact</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <NavbarText className="mr-3">
              <SignInModal />
            </NavbarText>
            <NavbarText>
              <Link to="/sign-up">
                <button className="signup-btn">Sign Up</button>
              </Link>
            </NavbarText>
          </Container>
        </Navbar>
        <Container>
          <div className="top-screen-text">
            <h1 data-aos="fade-down" data-aos-duration="2000">
              Online health care.
            </h1>
            <h4 data-aos="fade-down" data-aos-duration="1500">
              consult, diagnose, treat{" "}
            </h4>
          </div>
          <div className="logo-index">
            <img src={DoctorIcon} alt="doctor-icon" className="doctor-icon" />
          </div>
        </Container>
      </div>
      <div className="service-list-index">
        <Container>
          <div className="mt-3">
            <h1 data-aos="fade-down" data-aos-duration="1500">
              All Service
            </h1>
            <Row>
              <Col
                md={4}
                className="service-item"
                data-aos="fade-down"
                data-aos-duration="2300"
              >
                <img src={NurseIcon} alt="nurse-icon" />
                <p className="mt-4">Consult 24.hr</p>
              </Col>
              <Col
                md={4}
                className="service-item"
                data-aos="fade-down"
                data-aos-duration="2300"
              >
                <img src={ChatIcon} alt="chat-icon" />
                <p className="mt-4">Chat with doctor 24 hr.</p>
              </Col>
              <Col
                md={4}
                className="service-item"
                data-aos="fade-down"
                data-aos-duration="2300"
              >
                <img src={PhoneIcon} alt="phone-icon" />
                <p className="mt-4">Call center 24 hr. </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
