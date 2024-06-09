import { Link } from "react-router-dom";
import image6 from "./images/Hostel6.jpeg";
import image2 from "./images/Hostel2.jpeg";
import image3 from "./images/Hostel3.jpeg";
import image4 from "./images/Hostel4.jpeg";
import image5 from "./images/Hostel5.jpeg";
import image1 from "./images/hostel1.jpg";
import image7 from "./images/Hostel3.jpeg";
import image8 from "./images/Hostel2.jpeg";
import Navbar from "./Navbar"
import { useState } from 'react';

function About() {


  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image7,
    image8,
    image6,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="  ">
      <Navbar />

      <div className=" pb-5 border-b rounded-2xl">
        <div >
          <p className="text-center font-serif text-4xl py-2">
            Hostel Administration
          </p>
        </div>
        <div className="flex justify-evenly">
          <div className="rounded-xl p-1 w-1/5" >
            <img className="rounded shadow" src={image6}></img>
            <div className="justify-center text-center">
              <p className="p-0 m-0">loremipsun</p>
              <p className="p-0 m-0">
                designation
              </p> <p className="p-0 m-0">phonenumebr</p>
            </div>
          </div>
          <div className="rounded-xl p-1 w-1/5" >
            <img className="rounded shadow" src={image6}></img>
            <div className="justify-center text-center">
              <p className="p-0 m-0">loremipsun</p>
              <p className="p-0 m-0">
                designation
              </p> <p className="p-0 m-0">phonenumebr</p>
            </div>
          </div>
          
          <div className="rounded-xl p-1 w-1/5" >
            <img className="rounded shadow" src={image6}></img>
            <div className="justify-center text-center">
              <p className="p-0 m-0">loremipsun</p>
              <p className="p-0 m-0">
                designation
              </p> <p className="p-0 m-0">phonenumebr</p>
            </div>
          </div>
          <div className="rounded-xl p-1 w-1/5" >
            <img className="rounded shadow" src={image6}></img>
            <div className="justify-center text-center">
              <p className="p-0 m-0">loremipsun</p>
              <p className="p-0 m-0">
                designation
              </p> <p className="p-0 m-0">phonenumebr</p>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-gray-300 pb-5 border-b rounded-2xl">
        <div>
          <p className="text-center font-serif text-4xl py-2">Gallery</p>
        </div>
        <div className="flex  justify-center  h-screen ">
          <button onClick={handlePrev} className=" px-3 py-1 text-4xl rounded-md hover:transition-all transition duration-150 ease-in-out h-screen absolute left-0">
            Prev
          </button>
          <div className="flex  ">
            <img
              src={images[currentIndex]}
              alt="Gallery Image"
              className="rounded-2xl  item-center  max-h-ful "
            />
          </div>
          <button onClick={handleNext} className=" px-3 py-1 text-4xl  rounded-md  hover:transition-all transition duration-150 ease-in-out absolute h-screen  right-0">
            Next
          </button>
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
          <img className="w-102 h-96 border rounded-3xl" src={image1}></img>
        </div>
        <div className=" p-3">
          <img className="w-102 h-96 border rounded-3xl" src={image7}></img>
        </div>
      </div>
      </div>

      <div>
        <div className="text-center">
          <p className="text-center text-4xl py-2">Alumni</p>

        </div>
        <div>
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



    </div>
  );
}

export default About;