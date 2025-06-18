import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-center px-4 transition-all duration-300">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mt-12 sm:mt-0">
        Talk to Your AI Buddy
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-base sm:text-lg">
        Build real-time conversations with an intelligent chatbot built using the MERN stack.
        Your messages, your conversations — all in one place.
      </p>
      <img
        src="/undraw_chatting_2b1g.svg"
        alt="Chatbot"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-10 drop-shadow-xl"
      />
    </div>
  );
};


export default Home;
