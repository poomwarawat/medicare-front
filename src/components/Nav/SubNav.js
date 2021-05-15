import React, { useState } from "react";
import { Container } from "reactstrap";
import Ellipse from "../Button/Ellipse";

const initState = [
  "พบแพทย์",
  "สอบถามบริการ",
  "สอบถามอาการ",
  "ติดต่อเจ้าหน้าที่",
];

export default function SubNav() {
  const [services] = useState(initState);
  return (
    <div className="subnav box-shadow">
      <Container>
        <div className="subnav-content">
          {services.map((service, index) => {
            return (
              <span className="mr-1">
                <Ellipse msg={service} key={index} />
              </span>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
