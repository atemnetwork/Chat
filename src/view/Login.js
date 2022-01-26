import React, {useState} from "react";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
import { Button, Spin, Modal, Card } from "antd";
import Metamask from "../images/metamaskWallet.png";
import Coinbase from "../images/coinbase.png";

import "./Login.css";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
    // cursor: "pointer",
    // backgroundColor: "blue"
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "Coinbase",
    icon: Coinbase,
    connectorId: "injected",
    priority: 2,
  },
];

function Login() {
  const { authenticate, isAuthenticated, isAuthenticating, authError } = useMoralis();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  return (
    <div>
      {!isAuthenticating ? (
        <>
          {/* <Row justify="center" style={{ height: 800, marginTop: "15%" }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            WELCOME
          </Title> */}
          {isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            
            <>
            <div className="btn-login"
          onClick={() => setIsAuthModalVisible(true)}
        >
          Authenticate
        </div>
        {authError && (
          <p className="error-login">{authError.name}
          {authError.message}</p>
        )}
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
        <div style={{ padding: "10px", display: "flex", justifyContent: "center", fontWeight: "700", fontSize: "20px" }}>
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <p style={{ fontSize: "14px" }}>{title}</p>
              </div>
            ))}
          </div>
        </Modal>
        </>
          )}
          {/* </Col>
      </Row> */}
        </>
      ) : (
        <Spin size="large" tip="Loading..."></Spin>
      )}
    </div>
  );
}

export default Login;
