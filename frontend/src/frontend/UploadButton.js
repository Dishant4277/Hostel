import React, { useRef, useState } from "react";
import axios from "axios";

const UploadButton = ({ getData, setShowUploadDiv }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "upload/file/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      getData();
      setShowUploadDiv(false);
      setLoading(false);
      alert("Students Added Successfully");
    } catch (error) {
      console.error("Error uploading file", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container flex justify-center">
        <input
          ref={fileRef}
          className="my-2 pt-2"
          type="file"
          accept=".xlsx"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          name="file"
          id="fileInput"
        />
        {selectedFile ? (
          <button
            className="p-2 my-2 rounded-md bg-blue-500 text-white hover:bg-blue-400"
            onClick={onFileUpload}
          >
            {loading ? "Uploading..." : <>Upload {selectedFile.name}</>}
          </button>
        ) : (
          <button
            className="bg-gray-200 p-2 my-2 rounded-lg hover:bg-green-300 hover:text-black "
            onClick={() => fileRef.current.click()}
          >
            Upload a .xlsx File
          </button>
        )}
      </div>
    </>
  );
};

export default UploadButton;
