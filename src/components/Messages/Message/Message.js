import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({
  message: { text, user, firstname },
  name,
  firstname2,
  myname,
}) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10 mt-4">{trimmedName === user && myname}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite mt-3">
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark mt-3">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 mt-4">
        {firstname2 === undefined ? "Admin" : firstname2}
      </p>
    </div>
  );
};

export default Message;
