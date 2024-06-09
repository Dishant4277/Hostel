// src/components/StudentsTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton";

const HostelStudents = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5800/getData")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="flex bg-blue-300 font-serif p-2 items-center justify-evenly m-0">
        <div className="logo ">
          <img
            className="float-left max-h-20"
            src="LOGO_50135-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="mx-auto ">
          <div className="self-start text-5xl">
            <h1>Boys Hostel GCET Jammu</h1>
          </div>
        </div>
        <div className="float-right px-2 flex">
          <h4 className="mx-1">{JSON.parse(auth).Name}</h4>{" "}
          <h5 className="mx-1">
            {JSON.parse(auth).RoomNumber}-{JSON.parse(auth).Block}
          </h5>
        </div>
      </div>
      <BackButton />
      <div class="text-2xl font-bold text-center text-blue-500 mt-10 underline">
        Students residing in the Hostel
      </div>

      <div className="flex justify-evenly">

        <Card className="h-70 w-70 my-10 overflow-scroll shadow bg-slate-100">

          <table className=" table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none  opacity-70"
                  >
                    Room
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Block
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    phone
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Semester
                  </Typography>
                </th>

                {/* Add other table headers (Roll Number, Fee Paid, Phone, Semester) */}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) &&
                students?.map((student) => (
                  <tr key={student._id}>
                    <td className="p-4 border-b">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.RoomNumber}
                      </Typography>
                    </td>

                    <td className="p-4 border-b">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.Block}
                      </Typography>
                    </td>

                    <td className="p-4 border-b">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.Name}
                      </Typography>
                    </td>

                    <td className="p-4 border-b">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.PhoneNumber}
                      </Typography>
                    </td>

                    <td className="p-4 border-b">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.Semester}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default HostelStudents;
