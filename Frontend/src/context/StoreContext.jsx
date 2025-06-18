import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const url = "http://localhost:4000";
  const url = "https://chatbot-backend-jofz.onrender.com";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("Stored Token:", storedToken);
  }, []);

  const contextValue = {
    token,
    setToken,
    url,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
