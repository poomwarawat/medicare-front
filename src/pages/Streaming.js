import React, { useRef, useEffect, useState } from "react";
import "../css/Streaming.css";
import io from "socket.io-client";
import axios from "axios";
import queryString from "query-string";
import Peer from "simple-peer";

let socket;
let endpoint = "localhost:4000";

export default function Streaming({ location }) {
  const [stream, setMyStream] = useState();
  const [me, setMe] = useState([]);
  const [call, setCall] = useState();
  const [accept, setAccept] = useState(false);

  const myVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get("http://localhost:4000/authen/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      });
      const { msg } = await res.data;
      const { data } = msg;
      setMe(data);
    };
    getProfile();
  }, []);

  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setMyStream(currentStream);
        myVideo.current.srcObject = currentStream;
        partnerVideo.current.srcObject = currentStream;
      });

    socket.on("me", (meID, callback) => {
      callback(meID);
      const { to } = queryString.parse(location.search);
      socket.emit("join-streaming", { to: to });
    });

    socket.on("hey", (data) => {
      setCall(data.signal);
      acceptCall(data.from, data.signal);
    });
  }, []);

  useEffect(() => {
    socket.on("receive-answer-streaming", (fromID) => {
      callPeer(fromID);
    });
  }, []);

  const acceptCall = (to, signal) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: to });
    });

    peer.on("stream", (stream) => {
      setAccept(true);
      // partnerVideo.current.srcObject = stream;
    });
    peer.signal(signal);
  };

  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        // partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      // setCallAccepted(true);
      peer.signal(signal);
    });
  };

  return (
    <div className="streaming-page">
      <div className="my-streaming box-shadow">
        <video playsInline muted ref={myVideo} autoPlay />
      </div>
      <div className="user-streaming">
        <video
          className="user-streaming-video"
          playsInline
          ref={partnerVideo}
          autoPlay
        ></video>
      </div>
      <div className="streaming-controller">
        <button className="streaming-end-btn box-shadow">END</button>
      </div>
    </div>
  );
}
