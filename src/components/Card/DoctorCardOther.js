import React from "react";

export default function DoctorCardOther(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="doctor-card-offline box-shadow">
      <img
        src={props.data.img}
        alt={props.data.name}
        className="doctor-card-img-offline"
      />
      <div className="mt-2 pl-3 pr-3 pb-3">
        <h4>
          {capitalizeFirstLetter(props.data.name)} {props.data.lastname}
        </h4>
        <hr className="hr" />
        <p>Campus : Bang kun tian</p>
        <p>
          Status : <span className="offline">Offline</span>
        </p>
        <button className="view-profile-btn box-shadow">View profile</button>
      </div>
    </div>
  );
}
