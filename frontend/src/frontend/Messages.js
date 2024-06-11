import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Card } from "@material-tailwind/react";
import BackButton from "./BackButton";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "getData")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteMessage = async (id) => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}deleteMessage/${id}`,
      {
        method: "PUT",
      }
    );
    result = await result.json();
    if (result) {
      alert(" deleted");
    }

    console.warn(id);
  };
  return (
    <>
      <Navbar />
      <BackButton></BackButton>
      <div className="w-50 mx-auto">
        <Card className="h-70 w-70 my-10 overflow-scroll p-5 bg-gray-200">
          {messages.map(
            (message, index) =>
              message.textMessage && (
                <div className="rounded-3xl bg-gray-100 py-2 px-3 mt-2 ">
                  <div className="flex justify-evenly space-x-5 text-xs text-blue-500">
                    <p> {message.Name}</p>
                    <p>{message.PhoneNumber}</p>
                    <p>
                      {message.RoomNumber}-{message.Block}
                    </p>
                  </div>
                  <div className="text-base flex justify-between ">
                    {message.textMessage}
                    <button
                      className="bg-gray-300 px-2 py-2 rounded-3xl hover:bg-black hover:text-white"
                      type="submit"
                      onClick={() => deleteMessage(message._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </Card>
      </div>
    </>
  );
}
