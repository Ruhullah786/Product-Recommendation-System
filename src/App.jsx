import React, { useState } from "react";
import { Sparkles, PackageOpen } from "lucide-react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { products as initialProducts } from "./data/products";
import { getRecommendations } from "./services/geminiService";
import "./App.css";

/**
 Manages the global state of the application:
- Product catalog
- AI recommendations
- Loading state
- Error handling
 */
export default function App() {
  // --- STATE HOOKS ---
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [aiReasons, setAiReasons] = useState({}); // Map of productId -> AI matching reason text
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  
  const handleAISearch = async (userQuery) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the isolated geminiService using the official Google Gen AI SDK
      const recommendations = await getRecommendations(userQuery, products);
      
      if (recommendations.length === 0) {
        // If the AI successfully returned an empty array, it means no items matched
        setFilteredProducts([]);
        setAiReasons({});
      } else {
        // Extract matching IDs
        const matchedIds = recommendations.map(item => item.id);
        
        // Filter catalog based on matching IDs
        const matchedProducts = products.filter(p => matchedIds.includes(p.id));
        setFilteredProducts(matchedProducts);

        // Map product IDs to their respective AI reasoning texts
        const reasonsMap = {};
        recommendations.forEach(item => {
          reasonsMap[item.id] = item.reason;
        });
        setAiReasons(reasonsMap);
      }
      setIsFiltered(true);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      // Gracefully capture error state to prevent app crashing
      setError(err.message || "Failed to retrieve AI recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets recommendations, resetting the catalog view to show all products
   */
  const handleResetRecommendations = () => {
    setFilteredProducts(products);
    setAiReasons({});
    setIsFiltered(false);
    setError(null);
  };

  return (
    <div className="app-container">
      {/* Brand Header */}
      <Navbar/>

      {/* Main Container */}
      <main className="main-content" role="main">
        {/* Interactive Glassmorphic Hero Banner */}
          <section className="hero-section">
          <h1 className="hero-title">
                Product Recommendation System
         </h1>
          <p className="hero-subtitle">
           Enter your product preference below and get recommendations from the available products.
          </p>

          <SearchBar 
            onSearch={handleAISearch} 
            onReset={handleResetRecommendations}
            isLoading={isLoading}
            isFiltered={isFiltered}
          />
        </section>

        {/* Dynamic Catalog Section Headers */}
          <div className="catalog-header">
          <h2>
            {isFiltered ? (
              <>
                <Sparkles size={20} className="header-badge-icon" />
                <span> Recommended Products ({filteredProducts.length})</span>
              </>
            ) : (
              <span>Browse Catalog ({products.length} Products)</span>
            )}
          </h2>
          {isFiltered && !isLoading && (
            <button className="btn btn-secondary btn-reset-top" onClick={handleResetRecommendations}>
              Show All Products
            </button>
          )}
        </div>

        {/* Dynamic Display Panels: Loading, Error, Empty list, or Grid Layout */}
          <div className="display-panel">
          {isLoading && <LoadingSpinner message="Finding matching products..." />}
          
          {error && <ErrorMessage message={error} onRetry={() => handleAISearch("")} />}
          
          {!isLoading && !error && (
            <>
              {filteredProducts.length === 0 ? (
               <div className="empty-state">
                  <PackageOpen size={48} className="empty-state-icon" />
                  <h3>No matching products found</h3>
                  <p>
                    Gemini couldn't find items in our catalog matching your search criteria. 
                    Try adjusting your requirements (e.g. price tags or features) and try again.
                  </p>
                  <button className="btn btn-primary" onClick={handleResetRecommendations}>
                    Reset and View All Products
                  </button>
                </div>
              ) : (
                <div className="product-grid" role="region" aria-label="Product list grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      aiReason={aiReasons[product.id]}
                     
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
