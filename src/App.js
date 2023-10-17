import "./App.css";
import ChatProvider from "./Context/ChatProvider";
import Chats from "./Pages/Chats";
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
