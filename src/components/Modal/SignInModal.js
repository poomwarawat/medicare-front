import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { SigninValidation } from "../../validations/SignInValidation";
import swal from "sweetalert";
import Loader from "../Loader/Loader";

let initUser = {
  email: "",
  password: "",
};

export default function SignInModal() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUser({ ...user, [id]: value });
  };

  const handleSignIn = async () => {
    setLoader(true);
    const validated = await SigninValidation(user);
    if (validated.error) {
      setError(validated.error.toString());
      return;
    }

    try {
      const fetch = await axios.post(
        "http://localhost:4000/authen/login",
        user
      );
      const data = await fetch.data;

      if (!data.status) {
        setError(data.msg);
        return;
      }
      const token = data.msg.token;
      const role = data.msg.role;
      localStorage.setItem("access-token", token);
      swal("เข้าสู่ระบบสำเร็จ", "กดที่ปุ่มเพื่อดำเนินการต่อ", "success").then(
        (value) => {
          toggle();
          setLoader(false);
          parseInt(role) === 1 ? redirectToHome() : redirectToDoctor();
        }
      );
    } catch (error) {
      setLoader(false);
      swal(
        "เกิดข้อผิดพลาด รหัส : " + error.response.data.code,
        "กรุณาใช้งานใหม่อีกครั้งในภายหลัง",
        "error"
      );
    }
  };

  const redirectToHome = () => {
    window.location.href = window.location.href + "home";
  };

  const redirectToDoctor = () => {
    window.location.href = window.location.href + "doctor";
  };

  const toggle = () => setModal(!modal);
  return (
    <div>
      {loader ? <Loader /> : null}
      <button className="signin-btn" onClick={toggle}>
        Sign In
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign in to Medicare</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="enter your email"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={handleInputChange}
              placeholder="enter your password"
            />
          </FormGroup>
        </ModalBody>
        {error}
        <ModalFooter>
          <Button color="primary" onClick={handleSignIn}>
            Sign In
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
