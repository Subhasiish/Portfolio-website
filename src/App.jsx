import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Added imports
import UIUXDesignPage from "./components/hire"; // Import the hire component

const App = () => {
  return (
    <Router>
      <div>
        {/* Example "Hire" button */}
        <Link to="/hire">
          <button
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Hire
          </button>
        </Link>

        <Routes>
          {/* Define route for the hire page */}
          <Route path="/hire" element={<UIUXDesignPage />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
