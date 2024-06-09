import Navbar from "./Navbar";
import React from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Warden() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const [newpassword, setnewPassword] = useState("");
  const [showPasswordDiv, setShowPasswordDiv] = useState(false);

  async function changeUserPassword(userId, newPassword) {
    setShowPasswordDiv(false);
    try {
      const response = await fetch(
        `http://localhost:5800/users/${userId}/change-ADMIN-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setnewPassword("");
      alert(data.message);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const showDIV = () => {
    setShowPasswordDiv(!showPasswordDiv);
  };

  return (
    <div className=" bg-gray-200 h-screen">
      <Navbar />

      <div className="flex justify-between items-center py-2 bg-slate-200 ">
        <h1 className="text-yellow-500 px-5">ADMIN ACCESS !!!</h1>

        <div className="mx-4 text-lg font-sans flex gap-3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline-purple focus:outline-none text-white  py-2 px-3 rounded-2xl"
            onClick={() => {
              navigate("/AdminRegistration");
            }}
          >
            Create New Admin User
          </button>
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline-purple focus:outline-none text-white  py-2 px-3 rounded-2xl"
            onClick={showDIV}
          >
            change password
          </button>
        </div>
      </div>
      <div className="float-right flex">
        {showPasswordDiv && (
          <div className="flex mx-4 flex-col">
            <input
              type="password"
              className="border-2 rounded"
              placeholder="enter new password"
              value={newpassword}
              onChange={(e) => setnewPassword(e.target.value)}
            ></input>
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline-purple focus:outline-none text-white px-0 my-1 rounded-2xl"
              onClick={() =>
                changeUserPassword(JSON.parse(auth)._id, newpassword)
              }
            >
              submit
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-evenly mt-20">
          <Link to="/Messages">
            <div className=" flex flex-col items-center">
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faBell} size="6x" />
              </div>
              <div className="flex justify-end items-end text-3xl">
                Messages
              </div>
            </div>
          </Link>

          <Link to="/Hostelirs">
            <div className=" flex flex-col items-center">
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faUsers} size="6x" />
              </div>
              <div className="flex justify-end items-end text-3xl">
                Hosteliers
              </div>
            </div>
          </Link>

          <Link to="/NoticeBoard">
            <div className=" flex flex-col items-center">
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faClipboard} size="6x" />
              </div>
              <div className="flex justify-end items-end text-3xl">NOTICE</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Warden;
