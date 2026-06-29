import React, { useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import "./SearchBar.css";

// List of preset query ideas to help users test the recommender instantly
const PRESETS = [
  "Noise cancelling audio for work",
  "Productivity tech under $200",
  "Smart home lighting",
  "Waterproof fitness gear"
];

/**
 * SearchBar component enabling users to input natural language queries
 * for AI recommendations, or choose from standard presets.
 * 
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function to invoke the Gemini service.
 * @param {Function} props.onReset - Callback function to clear the filter.
 * @param {boolean} props.isLoading - If true, disables input actions.
 * @param {boolean} props.isFiltered - Indicates if the catalog is currently filtered by recommendations.
 */
export default function SearchBar({ onSearch, onReset, isLoading, isFiltered }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "" || isLoading) return;
    onSearch(query);
  };

  const handlePresetClick = (presetText) => {
    if (isLoading) return;
    setQuery(presetText);
    onSearch(presetText);
  };

  const handleResetClick = () => {
    setQuery("");
    onReset();
  };

  return (
    <div className="search-section animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your preferences... (e.g. 'I want a silent keyboard for coding')"
            disabled={isLoading}
            aria-label="Natural language product preference search"
          />
        </div>
        
        <div className="search-button-group">
          <button 
            type="submit" 
            className="search-submit-btn" 
            disabled={isLoading || query.trim() === ""}
          >
            <Sparkles size={16} />
            <span>Recommend</span>
          </button>
          
          {isFiltered && (
            <button 
              type="button" 
              className="search-reset-btn" 
              onClick={handleResetClick}
              disabled={isLoading}
              title="Clear active recommendation filters and show all products"
            >
              <X size={16} style={{ marginRight: "4px" }} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </form>

      <div className="suggestions-container">
        <span className="suggestions-label">Try these presets:</span>
        <div className="suggestions-pills">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              className="suggestion-pill"
              onClick={() => handlePresetClick(preset)}
              disabled={isLoading}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
