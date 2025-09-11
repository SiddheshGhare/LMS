import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({})

  const loginuser = async (formData) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed. Try again.");
        return;
      }
      const { accessToken, refreshToken, user } = data.data;

      console.log("Login successful:", user);
      alert("Login successful!");
      setUser(user)

    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const logout = async () => {

    try {
      const res = await fetch("http://localhost:7000/api/user/logout", {
        method: "POST", // or GET (depending on your backend route)
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // VERY IMPORTANT: allows cookies to be sent/cleared
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Logout failed:", data.message);
        return;
      }

      console.log("Logout successful:", data.message);

      // Clear tokens from localStorage (if you stored them manually)
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");

      // Optionally redirect user to login page
      // window.location.href = "/login";
      setUser(null)
    } catch (err) {
      console.error("Error logging out:", err);
    }


  }

  const value = {
    loginuser,
    error,
    loading,
    user,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
