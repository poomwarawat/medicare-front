import React from "react";
import { Spinner } from "reactstrap";

export default function LoaderCircle() {
  return (
    <div className="loader-circle">
      <div className="loader-circle-item">
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
      </div>
    </div>
  );
}
