import React, { useState, useEffect } from "react";
import Nav from "../components/Nav/Nav";
import { Row, Col } from "reactstrap";
import io from "socket.io-client";
import axios from "axios";
import LoaderCircle from "../components/Loader/LoaderCircle";
import WaitingDoctor from "../components/Card/WaitingDoctor";

import "../css/Home.css";

const initService = [
  "แพทย์ผิวหนัง",
  "แพทย์กระดูก",
  "ทันตแพทย์",
  "สูติ-นรีแพทย์",
  "แพทย์ระบบทางเดินปัสสาวะ",
  "อายุรแพทย์",
  "แพทย์ระบบประสาท",
  "จักษุแพทย์",
  "แพทย์ทั่วไป",
];

let socket;
let endpoint = "localhost:4000";

export default function Home({ history }) {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState(initService);
  const [loader, setLoader] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState([]);

  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  }, []);

  useEffect(() => {
    const getDoctorList = async () => {
      const res = await axios.get("http://localhost:4000/doctor/doctor-list");
      const { status, code, msg } = await res.data;
      if (!status) {
        // console.log("empty list");
      }
      setDoctors(msg);
    };
    getDoctorList();
  }, []);

  useEffect(() => {
    const getWaitingRoom = async () => {
      try {
        const res = await axios.get("http://localhost:4000/queue/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        const { msg, status } = await res.data;
        if (status !== true) return;
        setWaitingRoom(msg);
      } catch (error) {
        // console.log(error);
      }
    };
    getWaitingRoom();
  }, []);

  const handleQueue = (e) => {
    const toID = e.target.id;
    setLoader(true);
    socket.emit("getting-queue", { toID }, (roomID) => {
      setTimeout(() => {
        setLoader(false);
        history.push(`/waiting-room/${roomID}`);
      }, 1000);
    });
  };

  const handleSelectService = async (e) => {
    setLoader(true);
    const id = e.target.id;
    const res = await axios.get(`http://localhost:4000/doctor/type?type=${id}`);
    const data = await res.data;
    setDoctors(data);
    setLoader(false);
  };

  return (
    <div>
      {loader === true && <LoaderCircle />}
      <div className="sticky">
        <Nav />
      </div>
      <Row>
        <Col md={9}>
          <div className="mt-2 left-home pl-3">
            <h1>ค้นหาแพทย์เฉพาะทาง</h1>
            <p>ท่านสามารถเลือกค้นหาแพทย์เฉพาะทางตามที่ท่านต้องการได้</p>
            <p>จำนวนแพทย์ในระบบ 3,123 คน</p>
            <div className="service-container">
              <Row>
                {services.map((service, index) => {
                  return (
                    <Col md={4} key={index}>
                      <button
                        className="service-btn"
                        id={index + 1}
                        onClick={handleSelectService}
                      >
                        {service}
                        <i></i>
                      </button>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="mt-4">
              <h1>พบแพทย์ที่ต้องการ</h1>
              <p>ท่านสามารถเลือกพบแพทย์ตามที่ท่านต้องการได้</p>
              <p>แพทย์ที่แสดงนั้นเป็นแพทย์ที่ออนไลน์อยู่ขณะนี้</p>
              <div className="onlines-doctor mt-4">
                {doctors.length > 0 &&
                  doctors.map((doctor, index) => {
                    return (
                      <div className="online-card" key={index}>
                        <div className="doctor-card-new">
                          <div className="doctor-img">
                            <div className="doctor-img-content">
                              <div className="online-icon"></div>
                              <img
                                src="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/130491457_413206213156828_8177840032424795754_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeH00RYqjOZ2SnF0wWcShPsz-_28BLWrtXf7_bwEtau1dw5pS5Y6FCFCiEzQ8dEtgmt71FwLTwafo2SF4S6YeD9Y&_nc_ohc=6brxL9KwxuAAX9D8qbp&_nc_ht=scontent.fbkk22-1.fna&oh=5e70fda74dab409da157187d154dc008&oe=60A0303E"
                                alt={`online-${doctor.name}`}
                                className="online-card-img"
                              />
                            </div>
                          </div>
                          <div className="doctor-card-information">
                            <h3>
                              นพ. {doctor.firstname} {doctor.lastname}
                            </h3>
                            <button className="service-icon">
                              แพทย์ทั่วไป
                            </button>
                            <br />
                            <span>{doctor.hospital}</span>
                            <br />
                            <span>{doctor.education}</span>
                            <br />
                            <span className="rating">5.0 125 ผู้รีวิว</span>
                          </div>
                          <div className="doctor-card-specific">
                            <p>ความชำนาญเฉพาะทาง</p>
                            <p>{doctor.special}</p>
                          </div>
                          <div className="doctor-card-contact">
                            <button
                              id={doctor.uid}
                              onClick={handleQueue}
                              className="doctor-contact"
                            >
                              พบแพทย์
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="mt-2 right-home">
            <div>
              <p>คิวพบแพทย์</p>
              {}
              {waitingRoom.length !== 0 ? (
                <WaitingDoctor waitingRoom={waitingRoom} />
              ) : (
                <span>ไม่มีคิวพบแพทย์</span>
              )}
            </div>
            <div className="mt-4">
              <p>ประวัติพบแพทย์</p>
              <span>ไม่มีประวัติพบแพทย์</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
