import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./store/slices/authSlice";

import "./App.css";
import * as Api from "./api";
import PostEditorPage from "./pages/PostEditorPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import WalkPage from "./pages/WalkPage";
import HospitalPage from "./pages/HospitalPage";
import BoardPage from "./pages/BoardPage";
import AiPage from "./pages/AiPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const dispatch = useDispatch();

    const fetchCurrentUser = async () => {
        if (sessionStorage.getItem("userToken") !== null) {
            try {
                // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
                const res = await Api.get("users/current");
                const currentUser = res.data;

                // dispatch 함수를 통해 로그인 성공 상태로 만듦.
                dispatch(LOGIN_SUCCESS(currentUser));
            } catch {
                console.log(
                    "%c SessionStorage에 토큰 없음.",
                    "color: #d93d1a;"
                );
            }
        } else {
            console.log("비로그인 상태");
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return "isLoading...";
    }

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/walk" exact element={<WalkPage />} />
                    <Route path="/hospital" exact element={<HospitalPage />} />
                    <Route path="/board" exact element={<BoardPage />} />
                    <Route path="/ai" exact element={<AiPage />} />
                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                    <Route
                        path="/postEditor"
                        exact
                        element={<PostEditorPage />}
                    />
                    <Route path="/post" exact element={<PostPage />} />
                </Routes>
            </Router>
        </React.Suspense>
    );
}

export default App;
