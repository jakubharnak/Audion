// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here later */}
          <Route
            path="/match"
            element={
              <div className="p-8 text-center">
                <h1>Audio Match Page - Coming Soon!</h1>
              </div>
            }
          />
          <Route
            path="/analyze"
            element={
              <div className="p-8 text-center">
                <h1>Analyze Page - Coming Soon!</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
