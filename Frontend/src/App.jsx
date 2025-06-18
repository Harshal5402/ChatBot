import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import LoginPage from "./Component/LoginPage";
import Home from "./Page/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./context/StoreContext";
import ChatPage from "./Page/ChatPage";

function App() {
  const { token, setToken } = useContext(StoreContext);
  const [login, setLogin] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 

   useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (

     <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-all duration-300">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
        <ToastContainer />
        <Navbar setLogin={setLogin} darkMode={darkMode} setDarkMode={setDarkMode} isLoggedIn={!!token} setToken={setToken}  />
        {login && <LoginPage type={login} onClose={() => setLogin(null)}  setToken={setToken} />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={token ? <ChatPage /> : <Navigate to="/" />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
