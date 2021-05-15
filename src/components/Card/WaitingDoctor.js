import React from "react";
import { Link } from "react-router-dom";

import "./WaitingDoctor.css";

export default function WaitingDoctor(props) {
  return (
    <>
      {props.waitingRoom.map((waiting, index) => {
        return (
          <Link to={`/waiting-room/${waiting.roomID}`}>
            <div className="waiting-room-card">
              <div className="waiting-room-card-left">
                <img
                  src="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/130491457_413206213156828_8177840032424795754_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeH00RYqjOZ2SnF0wWcShPsz-_28BLWrtXf7_bwEtau1dw5pS5Y6FCFCiEzQ8dEtgmt71FwLTwafo2SF4S6YeD9Y&_nc_ohc=6brxL9KwxuAAX9D8qbp&_nc_ht=scontent.fbkk22-1.fna&oh=5e70fda74dab409da157187d154dc008&oe=60A0303E"
                  alt={`queue-${waiting.roomID}`}
                  className="queue-img"
                />
              </div>
              <div className="waiting-room-card-right">
                <span>
                  นพ. {waiting.firstname} {waiting.lastname}
                </span>
                <br />
                <span>สถานะ : รอพบแพทย์</span>
              </div>
            </div>
          </Link>
        );
      })}{" "}
    </>
  );
}
