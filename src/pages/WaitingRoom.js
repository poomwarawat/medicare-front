import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { Spinner } from "reactstrap";
import axios from "axios";
import io from "socket.io-client";

import "../css/WaitingRoom.css";

let endpoint = "localhost:4000";
let socket;

export default function WaitingRoom({ match, history }) {
  const [roomID, setRoomID] = useState("");
  const [user, setUser] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  });

  useEffect(() => {
    // console.log("Hello");
    socket.emit("waiting-room", ({ error, queueID }) => {});
  }, []);

  useEffect(() => {
    socket.on("receive-chatroom", ({ chatroom }) => {
      history.push(`/chat/${chatroom.chatroomID}?role=1`);
    });
  }, []);

  useEffect(() => {
    const { roomID } = match.params;
    setRoomID(roomID);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/queue/get?roomID=${roomID}`
        );
        const { msg, status } = res.data;
        if (status === false) return;
        setUser(msg);
      } catch (error) {
        // console.log(error);
      }
    };
    getData();
  }, [roomID]);

  //get-doctor
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/queue/get-doctor?roomID=${roomID}`
        );
        const { msg, status } = res.data;
        if (status === false) return;
        setDoctor(msg);
      } catch (error) {}
    };
    getData();
  }, [roomID]);
  return (
    <div>
      <Nav />
      <div className="waiting-room-container">
        <div className="waiting-room-content text-center">
          <h1>ห้องรอคิว</h1>
          <h3>
            กรุณารอซักครู่ ขณะนี้แพทย์กำลังเตรียมตัวเพื่อทำการวินิจฉัย
            หากแพทย์เรียกพบแล้ว ระบบจะนำทางท่านไปยังห้องวินิจฉัยอัตโนมัติ
          </h3>
          <div className="mt-4">
            {doctor.length > 0 && (
              <h4>
                นายแพทย์ {doctor[0].firstname} {doctor[0].lastname}
              </h4>
            )}
          </div>
          <div>
            {user.length > 0 && (
              <h4>
                ผู้ใช้งาน {user[0].firstname} {user[0].lastname}
              </h4>
            )}
          </div>
          <div className="mt-4">
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
          </div>
        </div>
      </div>
    </div>
  );
}
