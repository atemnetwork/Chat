import React, {useEffect, useState} from "react";
import "./Chats.css";
import Nav from "../components/nav/Nav";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
import ChatBody from "../components/chatBody/ChatBody";
// import ChatList from "../components/chatList/ChatList";

function App() {
  const { isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3, isAuthenticating, account } = useMoralis();

  console.log(isAuthenticated)

  useEffect(() => {
    // const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, enableWeb3, isWeb3EnableLoading]);

  return (
    <div className="__main">
    {!isAuthenticating ? <>
      {isAuthenticated ? (
        <>
          <Nav />    
          <ChatBody />
        </>
      ) : (
        <Navigate to="/login"/>
      )}
      </> : <h3>Loading...</h3>
    }
    </div>
  );
}

export default App;
