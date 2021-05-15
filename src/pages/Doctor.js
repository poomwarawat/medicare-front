import React from "react";
import Nav from "../components/Nav/Nav";
import { Row, Col, Card, Button, CardTitle, CardText } from "reactstrap";
import History from "../assets/images/history.png";
import Queue from "../assets/images/queue.png";
import Account from "../assets/images/account.png";
import { Link } from "react-router-dom";

import "../css/DoctorHome.css";

export default function Doctor() {
  return (
    <div>
      <div className="sticky">
        <Nav />
        <div className="doctor-manager-container">
          <div className="doctor-manager-content">
            <Row>
              <Col md={4}>
                <Card body>
                  <CardTitle tag="h5">ประวัติการรักษา</CardTitle>
                  <div className="text-center">
                    <img
                      src={History}
                      className="doctor-manager-icon mt-3 mb-3"
                    />
                  </div>
                  <CardText>
                    คุณสามารถตรวจสอบประวัติการวินิจฉัยของคุณได้ที่นี่
                  </CardText>
                  <Button color="primary">ดูประวัติ</Button>
                </Card>
              </Col>
              <Col md={4}>
                <Card body>
                  <CardTitle tag="h5">ห้องเรียกคิว</CardTitle>
                  <div className="text-center">
                    <img
                      src={Queue}
                      className="doctor-manager-icon mt-3 mb-3"
                    />
                  </div>
                  <CardText>
                    คุณสามารถตรวจสอบคนไข้ที่กำลังรอเรียกคิวได้ที่นี่
                  </CardText>
                  <Link className="link" to="/doctor/waiting-queue">
                    <Button color="primary" className="w-100">
                      เรียกคิว
                    </Button>
                  </Link>
                </Card>
              </Col>
              <Col md={4}>
                <Card body>
                  <CardTitle tag="h5">จัดการบัญชี</CardTitle>
                  <div className="text-center">
                    <img
                      src={Account}
                      className="doctor-manager-icon mt-3 mb-3"
                    />
                  </div>
                  <CardText>
                    คุณสามารถจัดการบัญชีและการเงินของคุณได้ที่นี่
                  </CardText>
                  <Button color="primary">จัดการบัญชี</Button>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
