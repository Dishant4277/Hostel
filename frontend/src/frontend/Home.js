import Navbar from "./Navbar";

import image from "./images/hostel1.jpg";
import image2 from "./images/Hostel2.jpeg";
import image3 from "./images/Hostel3.jpeg";
import image4 from "./images/Hostel4.jpeg";
import image5 from "./images/Hostel5.jpeg";
import image6 from "./images/Hostel6.jpeg";
import image7 from "./images/Hostel7.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import React from "react";

import { Navigate } from "react-router-dom";

function Home({ setCurrentUser }) {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/");
  };

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      {/* <Navbar /> */}
      <div className="bg-white  text-grey-800 p-4 flex shadow-md w-auto">
      <div className="logo  ">
        <img
          className="float-left max-h-20"
          src="LOGO_50135-removebg-preview.png"
          alt=""
        />
      </div>

      <div className="mx-auto space-y-4 ">
        <div className="self-start text-5xl">
          <h1>Boys Hostel GCET Jammu</h1>
        </div>

        <div className="flex justify-center ">
          <ul className="flex space-x-5 text-lg font-sans">
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="https://www.gcetjammu.org.in/"> College</Link>
            </li>
            <li>
              <Link to="/About"> About us</Link>
            </li>
            <li>
              {" "}
              <Link to="https://gcetjammu.edugrievance.com/">
                {" "}
                Grievance portal
              </Link>
            </li>
            <li>
              {auth ? (
                <Link to="/" onClick={logout}>
                  Log out
                </Link>
              ) : (
                <Link to="/Login">Log in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="text-center text-xl font-mono font-bold ">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-center text-xl font-mono font-bold">
          {time.toLocaleDateString()}
        </div>
      </div>
    </div>

      <div
        className=""
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className="h-screen flex items-center justify-center ">
          <div className=" bg-gray-800/[0.4] rounded-2xl text-white  ">
            <h1 className="text-4xl font-bold  text-center">Contact us</h1>
            <div className="flex justify-evenly space-x-5 ">
              <div className="p-3  flex flex-col items-center">
                <h4 className="underline">Warden</h4>
                <h5>Dr. Vikesh Kumar</h5>
                <h6>9697327153</h6>
              </div>
              <div className="p-3 flex flex-col items-center">
                <h4 className="underline"> Asst. Warden</h4>
                <h5>Om Prakash Thakur</h5>
                <h6>9906189933</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-gray-300 p-5 border">
        <div className=" p-4 bg-gray-200 rounded-3xl">
          <img
            className="rounded-2xl shadow w-96"
            src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1564564047c13.jpg"
          ></img>
        </div>

        <div className="p-5 m-auto bg-gray-200 rounded-xl">
          <p className="">
            The hostel is located within the college premesis which makes it
            easier for the hosteliers to reach the college
          </p>
          <p>
            Hostel is within a distance of 300 meteres from the lecture halls{" "}
          </p>
        </div>
      </div>

      <div className="flex bg-gray-300 p-5">
        <div className="p-5 m-auto bg-gray-200 rounded-xl">
          <p className="">
            The hostel has a total of 150 rooms with a capacity of 200 students{" "}
          </p>
          <p>
            each room has a fan installed along with a tubelight and a charging
            port
          </p>
        </div>
        <div className=" p-4 bg-gray-200 rounded-3xl">
          <img className="rounded-2xl shadow w-96 h-78" src={image3}></img>
        </div>
      </div>

      <div className="flex bg-gray-300 p-5 border">
        <div className=" p-4 bg-gray-200 rounded-3xl">
          <img className="rounded-2xl shadow w-96" src={image2}></img>
        </div>

        <div className="p-5 m-auto bg-gray-200 rounded-xl">
          <p className="">
            Hostel comes with ample parking space for vehicles both two wheelers
            and four wheelers
          </p>
          <p></p>
        </div>
      </div>

      <div className="flex bg-gray-300 p-5">
        <div className="p-5 m-auto bg-gray-200 rounded-xl">
          <p className="">Hostel has two badminton courts one in each block</p>
          <p>Recreation hall with indoor games facilities</p>
          <p>Big play ground for outdoor games like cricket and football</p>
        </div>
        <div className=" p-4 bg-gray-200 rounded-3xl">
          <img className="rounded-2xl shadow w-96" src={image4}></img>
        </div>
      </div>

      <div className="inline-flex">
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image2}></img>
        </div>
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image4}></img>
        </div>
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image5}></img>
        </div>
      </div>
      <div className="inline-flex">
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image6}></img>
        </div>
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image}></img>
        </div>
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image7}></img>
        </div>
      </div>
    </>
  );
}
export default Home;
