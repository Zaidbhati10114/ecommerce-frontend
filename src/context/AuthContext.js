import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Don't log password

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user: userData } = response.data;

      if (!token || !userData) {
        console.error("Missing token or user data in response");
        return {
          success: false,
          message: "Invalid response from server",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);

      console.log("Login successful");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);

      let errorMessage = "Login failed";

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Check if backend is running.";
      } else {
        // Something else happened
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log("Attempting registration with:", { name, email });

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);

      const { token, user: userData } = response.data;

      if (!token || !userData) {
        return {
          success: false,
          message: "Invalid response from server",
        };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Check if backend is running.";
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
