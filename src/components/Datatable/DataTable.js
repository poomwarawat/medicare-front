import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import io from "socket.io-client";
import LoaderCircle from "../Loader/LoaderCircle";

let endpoint = "localhost:4000";
let socket;

export default function DataTable({ history, queues }) {
  const [loader, setLoader] = useState(false);
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "No",
        field: "no",
        width: 270,
      },
      {
        label: "Firstname",
        field: "firstname",
        width: 270,
      },
      {
        label: "Lastname",
        field: "lastname",
        width: 200,
      },
      {
        label: "Room ID",
        field: "roomID",
        width: 100,
      },
      {
        label: "Event",
        field: "event",
        width: 150,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    socket = io(endpoint, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  }, []);

  const handleClickQueue = (e) => {
    const roomID = e.target.id;
    setLoader(true);
    socket.emit("getting-room", { roomID }, ({ error, room }) => {
      if (error) return;
      const { chatroomID } = room;
      setTimeout(() => {
        setLoader(false);
        history.push(`/chat/${chatroomID}?role=2`);
      }, 1000);
    });
  };

  useEffect(() => {
    const data = {
      columns: [
        {
          label: "No",
          field: "no",
          width: 270,
        },
        {
          label: "Firstname",
          field: "firstname",
          width: 270,
        },
        {
          label: "Lastname",
          field: "lastname",
          width: 200,
        },
        {
          label: "Room ID",
          field: "roomID",
          width: 100,
        },
        {
          label: "Event",
          field: "event",
          width: 150,
        },
      ],
      rows: [],
    };
    queues.map((queue, index) => {
      const pushed = {
        no: parseInt(index) + 1,
        firstname: queue.firstname,
        lastname: queue.lastname,
        roomID: queue.roomID,
        event: (
          <button
            onClick={handleClickQueue}
            className="btn btn-primary"
            id={queue.roomID}
          >
            Go
          </button>
        ),
      };
      data.rows.push(pushed);
    });
    setDatatable(data);
  }, []);

  return (
    <>
      <div className="loader-datatable">{loader && <LoaderCircle />}</div>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        pagingTop
        searchTop
        searchBottom={false}
        barReverse
      />
    </>
  );
}
