import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal } =
    useCart();
  const [notification, setNotification] = useState("");

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateCartItem(itemId, newQuantity);
    if (!result.success) {
      setNotification("Failed to update quantity");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const result = await removeFromCart(itemId);
    if (result.success) {
      setNotification("Item removed from cart");
      setTimeout(() => setNotification(""), 3000);
    } else {
      setNotification("Failed to remove item");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">Add some items to get started!</p>
          <a
            href="/home"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Cart Items ({cart.length})
                </h2>
                <div className="space-y-4">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.item._id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {cartItem.item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {cartItem.item.description}
                            </p>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mt-2">
                              {cartItem.item.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(cartItem.item._id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem.item._id,
                                  cartItem.quantity - 1
                                )
                              }
                              disabled={cartItem.quantity <= 1}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem.item._id,
                                  cartItem.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              $
                              {(
                                cartItem.item.price * cartItem.quantity
                              ).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${cartItem.item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">
                    ${(getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold text-green-600">
                      ${(getCartTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium mt-6 transition-colors">
                Proceed to Checkout
              </button>

              <a
                href="/home"
                className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
