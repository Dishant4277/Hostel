import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

function RegistrationForm() {
  // Define the state variables for the form fields
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [RollNumber, setRollNumber] = useState("");
  const [Semester, setsemester] = useState("");
  const [Address, setAddress] = useState("");
  const [Block, setBlock] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const collectData = async () => {
    console.log(Name, RoomNumber, Block, PhoneNumber, RollNumber, Semester);
    setLoading(true);
    let result = await fetch(process.env.REACT_APP_BACKEND_URL + "register", {
      method: "post",
      body: JSON.stringify({
        Name,
        RoomNumber,
        Block,
        PhoneNumber,
        RollNumber,
        Semester,
        Address,
      }),
      headers: { "content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    // localStorage.setItem("user", JSON.stringify(result));
    setLoading(false);
    Navigate("/Hostelirs");
  };

  return (
    <>
      <div className="p-2">
        <button
          className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mb-2"
          onClick={() => Navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Registration Form
          </h1>
          <form className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="Name"
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
                onClick={collectData}
                className="w-32 p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
