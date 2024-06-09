import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

const Complaint = () => {
  const [textMessage, setTextMessage] = useState("");

  const auth = localStorage.getItem("user");

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(JSON.parse(auth)._id, textMessage);
  };

  const sendMessage = async (userId, textMessage) => {
    try {
      const response = await fetch(
        `http://localhost:5800/sendMessage/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ textMessage }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error sending message: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      if (response) {
        Navigate("/StudentPage");
      }

      setTextMessage("");
    } catch (error) {
      console.error(error.message);
    }
  };

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
      <div class="text-2xl font-bold text-center text-red-600 mt-10 underline">
        Send message to warden
      </div>

      <div className="container flex justify-center mt-10 ">
        <form
          className="bg-gray-100 p-6 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <textarea
            className="w-full h-32 p-2 border rounded-md resize-y"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Write here"
          />
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="py-5">
        <h4 className="text-center  text-red-600">Rules and Advice :</h4>
        <ul className="list-disc mb-0">
          <li className="mb-2">
            <h6>Messages sent will be seen by the Warden</h6>
          </li>
          <li className="mb-2">
            <h6>Don't send messages un-neccessary</h6>
          </li>
          <li className="mb-2">
            <h6>Don't use abusive language</h6>
          </li>
          <li className="mb-2">
            <h6>
              It may take some time to review your concern so kindly be patient
              and dont send multiple messages
            </h6>
          </li>
          <li className="mb-2">
            <h6>message should only contain relevent information</h6>
          </li>
          <li className="mb-2">
            <h6>
              If anyone found guilty of breaking the rules , action will be
              taken against him accordingly
            </h6>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Complaint;
