import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Fix: Add parentheses to actually call the hook
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEducator, setIsEducator] = useState(false);
  const [user, setUser] = useState(null);

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

      // Check if backend response indicates failure
      if (!res.ok || data.success === false) {
        const message = data.message || "Login failed. Please try again.";
        setError(message);
        toast.error(message);
        return;
      }

      // Success: extract user safely
      const user = data?.data?.user || data?.user;
      if (!user) {
        toast.error("User data missing in response.");
        return;
      }

      // Update state based on user role
      if (user.role === "educator") {
        setIsEducator(true);
      }

      setUser(user);
      toast.success("Login successful!");
      navigate("/dashboard"); // redirect if needed

    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Logout failed:", data.message);
        toast.error("Logout failed");
        return;
      }

      console.log("Logout successful:", data.message);
      toast.success("Logged out successfully!");

      // Reset all user-related state
      setUser(null);
      setIsEducator(false);
      navigate("/");

    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Error logging out");
    }
  };

  const updateRole = async () => {
    try {
      const roleUpdated = await fetch("http://localhost:7000/api/user/update-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await roleUpdated.json();

      if (roleUpdated.ok) {
        setIsEducator(true);
        toast.success("Role updated to educator!");
        // Optionally update the user object with new role
        setUser(prev => prev ? { ...prev, role: "educator" } : null);
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Error updating role");
    }
  };

  const value = {
    loginuser,
    error,
    loading,
    user,
    isAuthenticated: !!user,
    isEducator,
    logout,
    updateRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};