import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";

function Update() {
  // Define the state variables for the form fields
  const [Name, setName] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [RollNumber, setRollNumber] = useState("");
  const [Semester, setsemester] = useState("");
  const [Block, setBlock] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}users/${params.id}`
    );
    result = await result.json();
    console.warn(result);

    setName(result.Name);
    setRoomNumber(result.RoomNumber);
    setBlock(result.Block);
    setEmail(result.Email);
    setAddress(result.Address);
    setPhoneNumber(result.PhoneNumber);
    setRollNumber(result.RollNumber);
    setsemester(result.Semester);
  };

  // Handle the form submission

  const updateUser = async () => {
    setLoading(true);
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}users/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({
          Name,
          Email,
          RoomNumber,
          Block,
          PhoneNumber,
          RollNumber,
          Semester,
          Address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    Navigate("/Hostelirs");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-blue-400">
          Updation Form
        </h1>
        <form className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="RoomNumber"
              className="text-sm font-medium text-gray-600"
            >
              Room Number
            </label>
            <input
              type="text"
              id="RoomNumber"
              name="RoomNumber"
              value={RoomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Block"
              className="text-sm font-medium text-gray-600"
            >
              Block
            </label>
            <input
              type="text"
              id="Block"
              name="Block"
              value={Block}
              onChange={(e) => setBlock(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="PhoneNumber"
              className="text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="PhoneNumber"
              name="PhoneNumber"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="Semester"
              className="text-sm font-medium text-gray-600"
            >
              Semester
            </label>
            <input
              type="number"
              id="Semester"
              name="Semester"
              value={Semester}
              onChange={(e) => setsemester(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="RollNumber"
              className="text-sm font-medium text-gray-600"
            >
              Roll Number
            </label>
            <input
              type="number"
              id="RollNumber"
              name="RollNumber"
              value={RollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Address"
              className="text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={updateUser}
              className="w-32 p-2 bg-gray-500 hover:bg-blue-400 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
