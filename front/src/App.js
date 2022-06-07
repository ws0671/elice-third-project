import "./App.css";
import axios from "axios";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

function App() {
  const testPost = async () => {
    const res = await axios.post(serverUrl + "/upload", {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="App">
      <h1>front</h1>
    </div>
  );
}

export default App;
