import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/walk" exact element={<WalkPage />} />
                <Route path="/hospital" exact element={<HospitalPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/register" exact element={<RegisterPage />} />
                <Route path="/board" exact element={<BoardPage />} />
                <Route path="/ai" exact element={<AiPage />} />
            </Routes>
        </Router>
    );
}

export default App;
