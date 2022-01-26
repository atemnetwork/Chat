import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
// import Index from "./view/Index";
import Chat from "./view/Chat";
import Chats from "./view/Chats";
import { useMoralis } from "react-moralis";
import "./App.css";
import Login from "./view/Login";
import Trade from "./view/Trade";
import Tranfer from "./components/tranfer/Tranfer";

function App() {
  const { isAuthenticated, isAuthenticating } = useMoralis();

  return (
    
    <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          {/* {!isAuthenticating ? <>
          {!isAuthenticated ? <></> : (
          <> */}
          {/* <Route exact path="/home" element={<Index />}></Route> */}
          {/* <Route exact path="/chat" element={<Chat />}></Route> */}
          {/* <Route exact path="/login" element={<Login />}></Route> */}
          <Route exact path="/" element={<Chat />}></Route>
          <Route exact path="/chat/:id" element={<Chats />}></Route>
          <Route exact path="chat/:id/trade" element={<Trade />}></Route>
          <Route exact path="/tranfer" element={<Tranfer />}></Route>
          {/* </>)}
          </> : <>Loading...</>} */}
        </Routes>
    </Router>
    
    
  );
}

export default App;
