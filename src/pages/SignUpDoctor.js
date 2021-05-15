/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import SignInModal from "../components/Modal/SignInModal";
import Doctor from "../assets/images/regis-doctor@2x.png";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "../css/SignUp.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignUpDoctor() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2021-01-01T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar className="nav-signup box-shadow" dark expand="md">
        <NavbarBrand>
          <Link to="/" className="link">
            <h3>MEDICARE</h3>
          </Link>
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
        <NavbarText>
          <NavbarText className="mr-3">
            <SignInModal />
          </NavbarText>
        </NavbarText>
      </Navbar>
      <div className="create-account-doctor">
        <Row>
          <Col md={4} className="col">
            <div className="create-doctor-left">
              <div>
                <img src={Doctor} alt="doctor-image" />
              </div>
            </div>
          </Col>
          <Col md={8} className="col p-4">
            <h1>สมัครสมาชิก</h1>
            <p>
              สมัครสมาชิกเพื่อเข้าใช้งานเว็บไซต์
              โปรดกรอกข้อมูลให้ครบถ้วนตามกำหนด
            </p>
            <div className="mt-4">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField required id="firstname" label="Firstname" />
                <TextField required id="lastname" label="Lastname" />
                <TextField required id="email" label="Email" type="email" />
                <TextField required id="phone" label="Phone" />
                <FormControl required>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select labelId="Gender" id="gender">
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="date-picker"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControl required>
                  <InputLabel id="service_id">Medical field</InputLabel>
                  <Select labelId="service_id" id="service_id">
                    <MenuItem value={1}>แพทย์ทั่วไป</MenuItem>
                    <MenuItem value={2}>แพทย์ผิวหนัง</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required>
                  <InputLabel id="hospital">Hospital</InputLabel>
                  <Select labelId="hospital" id="hospital">
                    <MenuItem value={1}>โรงพยาบาลบางประกอก 9</MenuItem>
                    <MenuItem value={2}>โรงพยาบาลพญาไท 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required>
                  <InputLabel id="education_id">Education</InputLabel>
                  <Select labelId="education_id" id="education">
                    <MenuItem value={1}>แพทย์ศาสตร์ศิริราช ม.มหิดล</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                />
                <TextField
                  required
                  id="repeat-password"
                  label="Confirm password"
                  type="password"
                />
              </form>
              <div className="mt-4 ml-2">
                <Link to="/sign-up">
                  <p>Sign up with user account ? </p>
                </Link>
                <button className="create-account-btn box-shadow">
                  SIGN UP
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
