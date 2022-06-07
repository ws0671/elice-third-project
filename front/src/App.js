import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

function App() {
  const [pickedImage, setPickedImage] = useState({
    preview: "",
    data: "",
  });

  const submitImg = async () => {
    if (pickedImage.data !== "") {
      try {
        const formData = new FormData();
        formData.append("file", pickedImage.data);
        const res = await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setPickedImage(img);
  };

  return (
    <div className="App">
      <h1>front</h1>
      <input type="file" accept="pickedImage/*" onChange={handleFileChange} />
      <button type="submit" onClick={submitImg}>
        업로드
      </button>
    </div>
  );
}

export default App;
