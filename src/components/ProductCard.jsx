import React from "react";
import {
  Headphones,
  Keyboard,
  Lightbulb,
  Coffee,
  BatteryCharging,
  Armchair,
  Watch,
  Backpack,
  Wind,
  Plug,
  Dumbbell,
  Flower2,
  Star,
  Smartphone
} from "lucide-react";
import "./ProductCard.css";

const ICON_MAP = {
  Headphones,
  Keyboard,
  Lamp: Lightbulb,
  Cup: Coffee,
  BatteryCharging,
  Chair: Armchair,
  Watch,
  Backpack,
  Wind,
  Plug,
  Dumbbell,
  Flower: Flower2,
  Smartphone
};

export default function ProductCard({ product, aiReason }) {
  console.log(product.name, product.iconName);
 const IconComponent = ICON_MAP[product.iconName];
  const isRecommended = !!aiReason;

  return (
    <article className="product-card">
      <div className="card-header">
        <span className="category-tag">{product.category}</span>
        <div className="rating-badge">
          <Star size={14} fill="#fbbf24" stroke="none" />
          <span>{product.rating}</span>
        </div>
        <div className="product-icon-wrapper">
          <IconComponent size={40} strokeWidth={1.5} />
        </div>
      </div>

      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        {/* Specs Table */}
        <div className="product-specs">
          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
            <div className="spec-item" key={key}>
              <span className="spec-label">{key}:</span>
              <span className="spec-val">{val}</span>
            </div>
          ))}
        </div>

       <div className="card-footer">
       <span className="product-price">
         ${product.price}
       </span>
       </div>
      </div>

      {/* Render AI Reasoning segment if item was picked by Gemini */}
      {isRecommended && (
        <div className="ai-reason-box">
          <span className="ai-reason-label">
           Recommendation Reason
          </span>
          <p className="ai-reason-text">"{aiReason}"</p>
        </div>
      )}
    </article>
  );
}
