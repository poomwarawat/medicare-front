import React, { useState } from "react";
import Nav from "../components/Nav/Nav";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "../css/PreInformation.css";

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

export default function PreInformation() {
  const classes = useStyles();
  return (
    <div>
      <Nav />
      <div className="pre-information-container">
        <div className="pre-information-content">
          <h1>โปรดกรอกข้อมูลสุขภาพของท่าน</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField required id="weight" label="น้ำหนัก" />
            <TextField required id="height" label="ส่วนสูง" />
            <TextField required id="height" label="โรคประจำตัว" />
            <TextField required id="height" label="ยาที่แพ้" />
            <TextField required id="height" label="อาหารที่แพ้" />
          </form>
          <button className="submit-preinformat mt-3 ml-2">บันทึกข้อมูล</button>
        </div>
      </div>
    </div>
  );
}
