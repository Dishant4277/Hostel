import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import BackButton from "./BackButton";

function NoticeBoard() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageDiv, setImageDiv] = useState(true);
  const [delLoading, setDelLoading] = useState({ status: false, id: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImage();
    return () => {
      // Cleanup function to reset states when component is unmounted
      setImage(null);
      setAllImage(null);
    };
  }, []);

  const submitImage = async (e) => {
    if (image) {
      setImageUpload(true);
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Image uploaded successfully");
        getImage();
      } catch (error) {
        // Handle error during API call
        console.error("Error uploading image:", error);
      }
      setImageDiv(true);
      setImageUpload(false);
    } else {
      alert("Please select an image");
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "get-image"
      );
      console.log(result);
      setAllImage(result.data.data);
    } catch (error) {
      // Handle error during API call
      console.error("Error getting images:", error);
    }
    setLoading(false);
  };

  const deleteImage = async (id, fileId) => {
    setDelLoading({ status: true, id: id });
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}deleteImage/${id}/${fileId}`
      );
      console.log(result);
      setAllImage(allImage.filter((image) => image._id !== id));
      alert("Image deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting image");
    }
    setDelLoading({ status: false, id: null });
  };

  return (
    <>
      <Navbar />

      <BackButton></BackButton>
      <div className="flex justify-center">
        {imageDiv ? (
          <button
            type="button"
            onClick={() => setImageDiv(false)}
            className=" border-2 bg-blue-500 px-4 py-2 rounded-md  hover:bg-blue-400 text-white "
          >
            Upload an Image for the Notice Board
          </button>
        ) : (
          <form
            onSubmit={submitImage}
            className="bg-gray-300 py-2 px-4 rounded-2xl"
          >
            <input
              className="m-2"
              type="file"
              accept="image/*"
              onChange={onInputChange}
            />
            <button
              className=" border-2 bg-blue-400 px-4 py-2 rounded-2xl  hover:bg-green-500 text-white "
              type="submit"
            >
              {imageUpload ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        )}
      </div>
      <hr />
      <div className="flex justify-center">
        <h1>NOTICE BOARD </h1>
      </div>
      <div className="container">
        <div className="mt-2">
          {Array.isArray(allImage) && allImage.length > 0 ? (
            allImage.map((data) => {
              return (
                <div
                  key={data._id}
                  className="m-4 flex flex-col items-center justify-center gap-3 border border-black p-3 rounded-2xl"
                >
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL + "image/" + data.image
                    }
                    alt={"notifications"}
                  ></img>
                  <div className="flex justify-center">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded-2xl  hover:bg-red-600 hover:text-white "
                      onClick={() => deleteImage(data._id, data.fileId)}
                    >
                      {delLoading.status && delLoading.id === data._id
                        ? "Deleting..."
                        : "DELETE"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center ">
              {loading ? "Loading..." : "No New Notifications Uploaded."}
            </p>
          )}
        </div>
        <div className="flex justify-center p-3"></div>
      </div>
    </>
  );
}

export default NoticeBoard;
