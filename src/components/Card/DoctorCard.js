import React from "react";

export default function DoctorCard(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="doctor-card box-shadow">
      <div className="doctor-card-content">
        <div className="doctor-card-left-content">
          <img
            src={props.data.img}
            alt={props.data.name}
            className="doctor-card-img"
          />
        </div>
        <div className="doctor-card-right-content">
          <h4>
            {capitalizeFirstLetter(props.data.name)} {props.data.lastname}
          </h4>
          <hr />
          <span>Campus : Bangmod</span>
          <br />
          <span>
            Status : <span className="online">Online</span>
          </span>
          <div className="mt-2 bottom-content-doctor-card">
            <p>Queue : 9</p>
            <button className="doctor-btn float-right box-shadow">Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}
