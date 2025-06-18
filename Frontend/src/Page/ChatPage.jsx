// import React, { useState, useEffect, useRef, useContext } from "react";
// import { StoreContext } from "../context/StoreContext";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const ChatPage = () => {
//   const { url, token } = useContext(StoreContext);
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   const decoded = jwtDecode(token);
//   const userId = decoded.userId || decoded.id; // fallback for both cases

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${url}/api/chat/message`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const formatted = res.data.data.map((msg) => ({
//         from: msg.sender,
//         text: msg.message,
//       }));
//       setMessages([{ from: "bot", text: "Hi! How can I assist you today?" }, ...formatted]);
//     } catch (err) {
//       console.error("Error fetching messages", err);
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", message: input };
//     setMessages((prev) => [...prev, { from: "user", text: input }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${url}/api/chat/savemessage`,
//         userMsg,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const { botMessage } = res.data;

//       setMessages((prev) => [...prev, { from: "bot", text: botMessage.message }]);
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setMessages((prev) => [...prev, { from: "bot", text: "Something went wrong." }]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col">
//       <div className="text-center text-4xl font-bold py-6 text-blue-600 dark:text-blue-400">
//         ChatBot Assistant
//       </div>

//       <div className="flex-1 px-4 sm:px-10 md:px-24 overflow-y-auto space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`max-w-[80%] px-4 py-2 rounded-lg shadow-md w-fit text-sm sm:text-base ${
//               msg.from === "user"
//                 ? "ml-auto bg-blue-600 text-white"
//                 : "mr-auto bg-gray-200 dark:bg-gray-700"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {loading && (
//           <div className="mr-auto text-gray-500 text-sm px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg w-fit">
//             Bot is typing...
//           </div>
//         )}
//         <div ref={chatEndRef} />
//       </div>

//       <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-4 flex items-center gap-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type your message..."
//           className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
//         >
//           <i className="fas fa-paper-plane text-lg" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;




import React, { useState, useEffect, useRef, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChatPage = () => {
  const { url, token } = useContext(StoreContext);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const decoded = jwtDecode(token);
  const userId = decoded.userId || decoded.id;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${url}/api/chat/message`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = res.data.data.map((msg) => ({
        from: msg.sender,
        text: msg.message,
      }));
      setMessages([{ from: "bot", text: "Hi! How can I assist you today?" }, ...formatted]);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", message: input };
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/chat/savemessage`,
        userMsg,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { botMessage } = res.data;
      setMessages((prev) => [...prev, { from: "bot", text: botMessage.message }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "Something went wrong." }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <div className="text-center text-3xl sm:text-4xl font-bold py-4 sm:py-6 text-blue-600 dark:text-blue-400">
        ChatBot Assistant
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-16 py-2 space-y-2 sm:space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] px-4 py-2 rounded-lg shadow-md w-fit text-sm sm:text-base ${
              msg.from === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto text-gray-500 text-sm px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg w-fit">
            Bot is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-3 sm:px-6 py-3 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm sm:text-base focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
        >
          <i className="fas fa-paper-plane text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
