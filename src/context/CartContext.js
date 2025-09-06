import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/cart`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/cart/add`,
        {
          itemId,
          quantity,
        }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add item to cart" };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/cart/update`,
        {
          itemId,
          quantity,
        }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error("Error updating cart:", error);
      return { success: false, message: "Failed to update cart" };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/cart/remove/${itemId}`
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: "Failed to remove item" };
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.item?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
