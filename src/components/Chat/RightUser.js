import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

import "./RightUser.css";

export default function RightUser({ location, chatroomID }) {
  const [role, setRole] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { role } = queryString.parse(location.search);
    setRole(role);
  }, []);
  useEffect(() => {
    const getData = async () => {
      if (parseInt(role) === 1) {
        try {
          const res = await axios.get(
            `http://localhost:4000/chatroom/get/${chatroomID}?role=${role}`
          );
          const { status, msg } = await res.data;
          console.log(msg);
          if (!status) return;
          setUser(msg);
        } catch (error) {}
      }
    };
    getData();
  }, [role]);
  return (
    <div className="p-3">
      <h3>ข้อมูลแพทย์</h3>
      <div className="text-center">
        <img
          src="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/130491457_413206213156828_8177840032424795754_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeH00RYqjOZ2SnF0wWcShPsz-_28BLWrtXf7_bwEtau1dw5pS5Y6FCFCiEzQ8dEtgmt71FwLTwafo2SF4S6YeD9Y&_nc_ohc=6brxL9KwxuAAX9D8qbp&_nc_ht=scontent.fbkk22-1.fna&oh=5e70fda74dab409da157187d154dc008&oe=60A0303E"
          alt={`doctor`}
          className="chat-doctor-image box-shadow"
        />
      </div>
      {user.length > 0 && (
        <div className="mt-4 doctor-information">
          <span>
            นายแพทย์ {user[0].firstname} {user[0].lastname}
          </span>
          <br />
          <span>{user[0].role_name}</span>
          <br />
          <span>{user[0].hospital}</span>
          <br />
          <span>{user[0].education}</span>
        </div>
      )}
    </div>
  );
}
