import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { Navigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { User_Type } from "./Usser_Type";

function NewLogin({ setCurrentUser }) {
  // Define the state variables for the form fields
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Userpassword, setUserPassword] = useState("");
  const [RollNumber, setRollNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(false);

  const proceedLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(Email, Userpassword);

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "login/admin",
        {
          method: "POST",
          body: JSON.stringify({ Email, Userpassword }), // renamed Userpassword to password
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.message === "Authenticated") {
        localStorage.setItem("user", JSON.stringify(result.admin));
        setCurrentUser("admin");
        navigate("/Warden");
      } else {
        console.error("Not verified");
        alert("Invalid credentials"); // display an alert
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("please try again");
      // handle error scenario, e.g. display error message to user
    }
    setLoading(false);
  };

  const userLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(Userpassword, RollNumber);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "login/student",
        {
          method: "POST",
          body: JSON.stringify({ RollNumber, Userpassword }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.message === "Authenticated") {
        console.log("Verified");
        setCurrentUser("student");
        localStorage.setItem("user", JSON.stringify(result.student));
        navigate("/StudentPage");
      } else {
        console.error("Not verified");
        alert("Invalid credentials"); // display an alert
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Please try again.");
    }
    setLoading(false);
  };

  if (localStorage.getItem("CurrentUser")) {
    const currentUser = localStorage.getItem("CurrentUser");
    if (currentUser === "admin") {
      return <Navigate to="/Warden" replace />;
    } else if (currentUser === "student") {
      return <Navigate to="/StudentPage" replace />;
    }
  }

  return (
    <>
      <BackButton />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <h5>LOGIN AS</h5>
          </div>
          <div className="flex justify-center mb-4 ">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  defaultChecked={isAdmin}
                  onChange={() => setIsAdmin(true)}
                />
                <label htmlFor="admin" className="mr-2">
                  Admin
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  onChange={() => setIsAdmin(false)}
                />
                <label htmlFor="student" className="mr-2">
                  Student
                </label>
              </div>
            </div>
          </div>

          <form onSubmit={isAdmin ? proceedLogin : userLogin}>
            {isAdmin ? (
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={Email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <br />
                <label>Password:</label>
                <input
                  type="password"
                  value={Userpassword}
                  required
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <button
                  className="mt-2 shadow bg-purple-500 hover:bg-purple-400  focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={proceedLogin}
                >
                  {loading ? "Loading..." : "Login as Admin"}
                </button>
              </div>
            ) : (
              <div>
                <label>Roll Number:</label>
                <input
                  type="text"
                  value={RollNumber}
                  required
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <br />
                <label>Password:</label>
                <input
                  type="password"
                  value={Userpassword}
                  required
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 mt-2 rounded"
                  type="submit"
                  onClick={userLogin}
                >
                  {loading ? "Loading..." : "Login as Student"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default NewLogin;
