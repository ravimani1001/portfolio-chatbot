import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      
      <ChatWindow />
    </div>
  );
}

export default App;
