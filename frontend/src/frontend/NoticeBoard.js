import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function NoticeBoard() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
    return () => {
      // Cleanup function to reset states when component is unmounted
      setImage(null);
      setAllImage(null);
    };
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);

      const result = await axios.post(
        "http://localhost:5800/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      // Handle error during API call
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5800/get-image");
      console.log(result);
      setAllImage(result.data.data);
    } catch (error) {
      // Handle error during API call
      console.error("Error getting images:", error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5800/deleteImage/${id}`);
      console.log(result);
      setAllImage(allImage.filter((image) => image._id!== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <h1>NOTICE BOARD </h1>
      </div>
      <div className="container">
        <div className="mt-2">
          {Array.isArray(allImage) && allImage.length > 0 && allImage.map((data) => {
                return (
                  <div key={data._id} className="mt-1">
                    <img src={require(`./images/${data.image}`)}></img>
                    <div className="flex justify-center"><button className="bg-gray-300 px-4 py-2 rounded-2xl  hover:bg-red-600 hover:text-white " onClick={() => deleteImage(data._id)}>DELETE</button></div>
                    
                  </div>
                );
              })}
        </div>
        <div className="flex justify-center p-3">
          <form
            onSubmit={submitImage}
            className="bg-gray-300 py-2 px-4 rounded-2xl"
          >
            <input type="file" accept="image/*" onChange={onInputChange} />
            <button className=" hover:text-green-600" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NoticeBoard;