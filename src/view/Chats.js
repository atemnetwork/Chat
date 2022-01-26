import React, {useEffect} from "react";
import "./Chats.css";
import Nav from "../components/nav/Nav";
import ChatBody from "../components/chatBody/ChatBody";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function App() {
  const { isAuthenticated, isAuthenticating, account, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();

  useEffect(() => {
    // const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(isAuthenticated)
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
