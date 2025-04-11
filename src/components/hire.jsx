import React from "react";
import { Link } from "react-router-dom"; // Added import for Link

const UIUXDesignPage = () => {
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "30px",
    maxWidth: "800px",
    margin: "auto",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    color: "#eee",
  };

  const tagStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "14px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
  };

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
      }}
    >
      <Link to="/services"> {/* Updated to use Link for navigation */}
        <button
          style={{
            background: "transparent",
            border: "1px solid #555",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          ← Back to Services
        </button>
      </Link>

      <div style={glassStyle}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🎨 UI/UX Design</h2>

        <p style={{ fontSize: "16px", lineHeight: "1.7", marginBottom: "20px", color: "#ccc" }}>
          Our UI/UX design services focus on creating intuitive and engaging user interfaces
          that enhance user experience and drive engagement. We combine aesthetics with
          functionality to deliver memorable digital experiences.
        </p>

        <ul style={{ padding: 0, listStyle: "none", marginBottom: "30px" }}>
          {[
            "User interface design",
            "User experience optimization",
            "Wireframing and prototyping",
            "Design systems creation",
            "Interactive prototypes",
            "Usability testing",
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: "10px", fontSize: "15px" }}>
              ➜ {item}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Adobe Creative Suite"].map(
            (tool) => (
              <span key={tool} style={tagStyle}>
                {tool}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UIUXDesignPage;
