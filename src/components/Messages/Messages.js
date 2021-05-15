import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name, myname }) => (
  <ScrollToBottom debugg={false} className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message
          message={message}
          name={name}
          firstname2={message.firstname ? message.firstname : undefined}
          myname={myname}
        />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
