import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { Row, Col } from "reactstrap";
import queryString from "query-string";
import RightDoctor from "../components/Chat/RightDoctor";
import RightUser from "../components/Chat/RightUser";
import Messages from "../components/Messages/Messages";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CallingAudio from "../assets/sounds/calling.mp3";
import Button from "@material-ui/core/Button";

import "../css/Chat.css";
import axios from "axios";

const initMessage = [];

let endpoint = "localhost:4000";
let socket;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "500px",
    height: "150px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "relative",
    borderRadius: "4px",
  },
}));

export default function Chat({ location, match, history }) {
  const [chatroomID, setChatroomID] = useState("");
  const [role, setRole] = useState("");
  const [messages, setMessages] = useState(initMessage);
  const [uuid, setUUID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [message, setMessage] = useState("");
  const [toUser, setToUser] = useState([]);
  const [caller, setCaller] = useState(false);
  const [calling, setCalling] = useState(false);
  const classes = useStyles();
  const [userCall, setUserCall] = useState("");

  //let calling = new Audio(CallingAudio);

  const handleOpen = () => {
    // calling.play();
    setCaller(true);
  };
  const handleChangeCalling = () => {
    setCalling(!calling);
  };

  const handleClose = () => {
    // calling.pause();
    setCaller(false);
  };

  useEffect(() => {
    const gettoUser = async () => {
      if (chatroomID !== "") {
        try {
          const res = await axios.get(
            `http://localhost:4000/chatroom/get/${chatroomID}`
          );
          const { status, msg } = await res.data;
          if (!status) return;
          if (parseInt(role) === 1) {
            setToUser(msg[0].toID);
          } else if (parseInt(role) === 2) {
            setToUser(msg[0].fromID);
          }
        } catch (error) {}
      }
    };
    gettoUser();
  }, [chatroomID]);

  useEffect(() => {
    const getMessage = async () => {
      if (toUser.length > 0) {
        try {
          const res = await axios.get(
            `http://localhost:4000/chat-message/get?toID=${toUser}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access-token"),
              },
            }
          );
          const { msg, status } = res.data;
          if (!status) return;
          setStartMessage(msg);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessage();
  }, [toUser]);

  const setStartMessage = (messages) => {
    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      setMessages((old) => [...old, message]);
    }
  };

  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (chatroomID !== "") socket.emit("join", chatroomID);
  }, [chatroomID]);

  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      setMessages((message) => [...message, newMessage]);
    });
  }, []);

  useEffect(() => {
    const { role } = queryString.parse(location.search);
    setRole(role);
  }, []);

  useEffect(() => {
    const { chatroomID } = match.params;
    setChatroomID(chatroomID);
  }, [match.params]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/authen/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access-token"),
          },
        });
        const data = await res.data;
        setUUID(data.msg.data[0].uid);
        setFirstname(data.msg.data[0].firstname);
      } catch (error) {}
    };
    getUser();
  }, []);

  const handleTypeMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleSendMessage = () => {
    console.log(toUser);
    setMessage("");
    if (message) {
      socket.emit("send-message", {
        message: message,
        toID: toUser,
        chatroomID: chatroomID,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    socket.on("call", (callID, callback) => {
      // console.log(callID);
      callback(callID);
    });
  });

  const handleStreaming = (e) => {
    setCalling(true);
    const callID = e.target.id;
    socket.emit("start-call", { toID: callID });
  };

  useEffect(() => {
    socket.on("answercall", (data) => {
      setUserCall(data.name);
      handleOpen();
    });
  }, []);

  useEffect(() => {
    socket.on("cancel", (cancelID, callback) => {
      callback(cancelID);
    });
  }, []);

  useEffect(() => {
    socket.on("answercancel", ({ event }) => {
      if (event === "cancel") {
        handleClose();
      }
    });
  }, []);

  useEffect(() => {
    socket.on("accept", (acceptID, callback) => {
      callback(acceptID);
    });
  }, []);

  useEffect(() => {
    socket.on("answeraccept", ({ event, acceptID }) => {
      const { chatroomID } = match.params;
      if (event === "accept" && typeof toUser === "string") {
        history.push(`/streaming/${chatroomID}?to=${toUser}`);
      }
    });
  }, [toUser]);

  const handleCancel = () => {
    handleChangeCalling();
    socket.emit("start-cancel", { cancelID: `cancel:${toUser}` });
  };

  const handleAccept = () => {
    socket.emit(
      "start-accept",
      { acceptID: `accept:${toUser}` },
      ({ event }) => {
        if (event === "accept") {
          history.push(`/streaming/${chatroomID}?to=${toUser}`);
        }
      }
    );
  };

  return (
    <div>
      <div className="sticky">
        <Nav />
        <Row>
          <Col md={9}>
            <div className="p-3">
              <div className="message-area">
                {uuid !== "" && (
                  <Messages
                    messages={messages}
                    name={uuid}
                    myname={firstname}
                  />
                )}
              </div>
              <div className="typeing-message">
                <Row>
                  <Col md={10}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      onChange={handleTypeMessage}
                      onKeyPress={handleKeyPress}
                      value={message}
                    />
                  </Col>
                  <Col md={2}>
                    {toUser.length > 0 && (
                      <button
                        id={toUser}
                        className="send-btn"
                        onClick={handleSendMessage}
                      >
                        Send
                      </button>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="chat-right-console">
              {parseInt(role) === 1 ? (
                <RightUser location={location} chatroomID={chatroomID} />
              ) : (
                <RightDoctor location={location} chatroomID={chatroomID} />
              )}
              <button
                className="video-call-btn font-18"
                onClick={handleStreaming}
                id={`call:${toUser}`}
              >
                Video call
              </button>
              {caller && (
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={caller}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={caller}>
                    <div className={classes.paper}>
                      <h2 id="transition-modal-title">
                        {userCall !== "" && userCall} is calling you
                      </h2>
                      <div className="come-calling-area">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAccept}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="ml-2"
                        >
                          dismiss
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              )}
              {calling && (
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={calling}
                  onClose={handleChangeCalling}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={calling}>
                    <div className={classes.paper}>
                      <h2 id="transition-modal-title">
                        {firstname !== "" && firstname} is calling to {userCall}
                      </h2>
                      <div className="come-calling-area">
                        <Button
                          variant="contained"
                          color="secondary"
                          className="ml-2"
                          onClick={handleCancel}
                        >
                          cancel
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
