import "./App.css";
import Chats from "./Pages/Chats";
import HomePage from "./Pages/HomePage";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Route exact path="/" component={HomePage} />
      <Route exact path="/chats" component={Chats} />

    </div>
  );
}

export default App;
