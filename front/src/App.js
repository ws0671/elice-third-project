/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

function App() {
  const [pickedImage, setPickedImage] = useState({
    preview: "http://placekitten.com/200/200",
    data: "",
  });

  const [changeImage, setChangeImage] = useState(
    "http://placekitten.com/200/200"
  );
  const submitImg = async () => {
    if (pickedImage.data !== "") {
      try {
        const formData = new FormData();
        formData.append("image", pickedImage.data);
        const res = await axios.put(
          "http://localhost:5000/users/b33bfe21-53e2-433b-a906-c412d298048a",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
        setChangeImage(res.data.imageUrl);
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
      <div>
        <img src={pickedImage.preview} style={{ width: "200px" }} />
      </div>
      <input type="file" accept="pickedImage/*" onChange={handleFileChange} />
      <button type="submit" onClick={submitImg}>
        업로드
      </button>
      <div>
        <img src={changeImage} style={{ width: "200px" }} />
      </div>
    </div>
  );
}

export default App;
