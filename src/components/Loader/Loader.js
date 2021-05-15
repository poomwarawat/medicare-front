import React, { useState } from "react";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

//6384C3
//className="loader-bg"
export default function Loader() {
  let [loading] = useState(true);
  let [color] = useState("#FFFFFF");
  return (
    <div>
      <div className="loader-item">
        <PropagateLoader
          color={color}
          loading={loading}
          css={override}
          size={30}
        />
      </div>
    </div>
  );
}
