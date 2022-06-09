import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import WalkPage from "./pages/WalkPage";
import HospitalPage from "./pages/HospitalPage";
import BoardPage from "./pages/BoardPage";
import AiPage from "./pages/AiPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import PostEditorPage from "./pages/PostEditorPage";
import Post from "./components/common/board/Post";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/walk" exact element={<WalkPage />} />
                <Route path="/hospital" exact element={<HospitalPage />} />
                <Route path="/board" exact element={<BoardPage />} />
                <Route path="/ai" exact element={<AiPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/register" exact element={<RegisterPage />} />
                <Route path="/postEditor" exact element={<PostEditorPage />} />
                <Route path="/post" exact element={<Post />} />
            </Routes>
        </Router>
    );
}

export default App;
