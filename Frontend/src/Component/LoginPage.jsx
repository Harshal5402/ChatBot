import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ type, onClose }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const isLogin = type === "login";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? `${url}/api/user/login` : `${url}/api/user/register`;
    try {
      const res = await axios.post(endpoint, form);
      if (res.data.success === false) {
        toast.error(res.data.message || "Login failed");
        return;
      }
      console.log("Response Data:", res.data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      console.log("Saved Token:", res.data.token);
      toast.success(isLogin ? "Login successful" : "Registration successful");
      onClose();
      navigate("/chat");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-gray-900/60 to-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-2xl w-[90%] sm:w-[400px] p-8 relative animate-slide-up transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 dark:text-gray-300 text-lg hover:text-red-500"
        >
          <i className="fas fa-xmark"></i>
        </button>

        <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              name="name"
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-500 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                const opposite = isLogin ? "register" : "login";
                window.dispatchEvent(
                  new CustomEvent("openAuthModal", { detail: opposite })
                );
              }, 100);
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
