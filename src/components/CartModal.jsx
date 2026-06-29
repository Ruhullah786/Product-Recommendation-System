import React, { useState } from "react";
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  CheckCircle2,
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
  Sparkles 
} from "lucide-react";
import "./CartModal.css";

// Map matching catalog string keywords to Lucide Vector React components
const ICON_MAP = {
  Headphones: Headphones,
  Keyboard: Keyboard,
  Lamp: Lightbulb,
  Cup: Coffee,
  BatteryCharging: BatteryCharging,
  Chair: Armchair,
  Watch: Watch,
  Backpack: Backpack,
  Wind: Wind,
  Plug: Plug,
  Dumbbell: Dumbbell,
  Flower: Flower2
};

/**
 * Slide-out sidebar CartModal component displaying shopping cart items,
 * quantities, subtotals, and a mock checkout processor.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the cart modal is visible.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Array} props.cartItems - Array of products added to cart.
 * @param {Function} props.onUpdateQuantity - Callback to update item counts.
 * @param {Function} props.onRemoveItem - Callback to delete items from cart.
 * @param {Function} props.onClearCart - Callback to empty the cart.
 */
export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  // Calculate cart subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      onClearCart();
    }, 1500);
  };

  const handleClose = () => {
    setCheckoutSuccess(false);
    onClose();
  };

  return (
    <div className="cart-backdrop" onClick={handleClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-header">
          <div className="cart-title" id="cart-title">
            <ShoppingBag size={20} className="color-primary" />
            <span>Shopping Cart</span>
          </div>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </header>

        {checkoutSuccess ? (
          <div className="cart-empty animate-fade-in">
            <CheckCircle2 size={64} className="color-secondary" style={{ color: "var(--color-secondary)" }} />
            <h3 style={{ color: "#fff" }}>Order Placed Successfully!</h3>
            <p style={{ maxWidth: "280px" }}>Your items are being processed. Thank you for demonstrating the AI recommender cart!</p>
            <button className="btn btn-primary" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} style={{ opacity: 0.3 }} />
                  <p>Your cart is currently empty.</p>
                  <button className="btn btn-secondary" onClick={handleClose}>
                    Explore Products
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const Icon = ICON_MAP[item.iconName] || Sparkles;
                  return (
                    <div className="cart-item animate-slide-up" key={item.id}>
                      <div className="cart-item-icon">
                        <Icon size={24} />
                      </div>
                      
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <div className="cart-item-price">${item.price}</div>
                      </div>

                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn" 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={isCheckingOut}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={isCheckingOut}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button 
                          className="cart-item-remove"
                          onClick={() => onRemoveItem(item.id)}
                          disabled={isCheckingOut}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <footer className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Subtotal:</span>
                  <span className="cart-total-amount">${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-primary checkout-btn" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  <CreditCard size={16} />
                  <span>{isCheckingOut ? "Processing Order..." : "Checkout Order"}</span>
                </button>
              </footer>
            )}
          </>
        )}
      </div>
    </div>
  );
}
