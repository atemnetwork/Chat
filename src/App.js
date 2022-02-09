import React, {useEffect} from "react";
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
import NFT from "./view/NFT";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

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
          <Route exact path="/tranferCoin/:id" element={<Tranfer />}></Route>
          <Route exact path="/tranferNFT/:id" element={<NFT />}></Route>
          {/* <Route exact path="/nft" element={<NFT />}></Route> */}
          {/* </>)}
          </> : <>Loading...</>} */}
        </Routes>
    </Router>
    
    
  );
}

export default App;
