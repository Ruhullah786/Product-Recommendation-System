import React from "react";
import "./LoadingSpinner.css";

/**
 * LoadingSpinner component displays a premium, animated loading state
 * while recommendations are being fetched from the Gemini API.
 * 
 * @param {Object} props
 * @param {string} [props.message="Consulting Gemini AI Recommender..."] - Optional custom loading message.
 */
export default function LoadingSpinner({ message = "Consulting Gemini AI Recommender..." }) {
  return (
    <div className="spinner-container animate-fade-in" aria-live="polite" aria-busy="true">
      <div className="spinner-ring">
        <div className="spinner-glow"></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}
