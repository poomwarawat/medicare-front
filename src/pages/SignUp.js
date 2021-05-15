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
// import { registerValidation } from "../validations/RegisterValidation";
// import axios from "axios";
// import swal from "sweetalert";
import SignInModal from "../components/Modal/SignInModal";
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

let initState = {
  email: null,
  firstname: null,
  lastname: null,
  gender: null,
  birthday: null,
  password: null,
  repassword: null,
};

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

export default function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [regis, setRegis] = useState(initState);
  const [error, setError] = useState("");
  const classes = useStyles();

  const toggle = () => setIsOpen(!isOpen);

  const [selectedDate, setSelectedDate] = useState(
    new Date("2021-01-01T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [checked, setChecked] = useState(true);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };
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
      <div className="create-account">
        <Row>
          <Col md={3} className="col">
            <div className="create-account-left">
              <div className="ca-left-content">
                <h1>Let's join with medicare</h1>
                <Link className="link" to="/sign-up-doctor">
                  <button className="join-doctor-btn">
                    Create doctor account
                  </button>
                </Link>
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
                <TextField required id="email" label="Email" />
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
