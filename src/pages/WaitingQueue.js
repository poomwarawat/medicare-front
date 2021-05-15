import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import io from "socket.io-client";
import axios from "axios";
import DataTable from "../components/Datatable/DataTable";

let socket;
let endpoint = "localhost:4000";

export default function WaitingQueue({ history }) {
  const [queues, setQueues] = useState([]);
  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  }, []);

  useEffect(() => {
    socket.emit("waiting-queue", (roomID) => {});
  }, []);

  useEffect(() => {
    socket.on("receive-queue", (message) => {
      getWaitingQueue();
    });
  }, []);

  useEffect(() => {
    getWaitingQueue();
  }, []);
  const getWaitingQueue = async () => {
    try {
      const res = await axios.get("http://localhost:4000/waiting-queue/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const { msg, status } = await res.data;
      if (status !== true) {
        console.log("error");
      }
      setQueues(msg);
    } catch (error) {
      //   console.log(error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="p-4">
        <h1>คิวของคุณขณะนี้</h1>
        {queues.length > 0 && <DataTable queues={queues} history={history} />}
      </div>
    </div>
  );
}
