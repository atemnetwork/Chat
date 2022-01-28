import React, { useState, useEffect, useMemo } from "react";
import "./userProfile.css";
import person from "../../images/person default.jpg";
import {
  useMoralis,
  useNativeBalance,
  useMoralisQuery,
} from "react-moralis";
import { Modal, Button } from "antd";
// import { useERC20Balance } from "./ERC20Balance";
import Chain from "./Chain.jsx";
import GetfullBalance from "../hooks/GetfullBalance";

export default function UserProfile() {
  const { user, setUserData, logout, Moralis, chainId } = useMoralis();
  const { fullBalance } = GetfullBalance()

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Change username");
  const [username, setUsername] = useState("");

  const { data: nativeBalance, nativeToken } = useNativeBalance();

  const { data: groups } = useMoralisQuery("Group");

  useEffect(() => {
    if (fullBalance && groups) {
      fullBalance.forEach((i) => {
        groups.forEach((y) => {
          if (
            i.symbol === "BNB" &&
            parseInt(i.balance) > 0 &&
            y.get("nameGroup") === "BNB"
          ) {
            const Monster = Moralis.Object.extend("Group");
            const query = new Moralis.Query(Monster);

            query.get(y.id).then(
              (monster) => {
                const users = monster.get("username");
                if (users.length == 0) {
                  monster.addUnique("username", user.get("ethAddress"));
                  monster.save();
                } else {
                  users.forEach((e) => {
                    if (e.toLowerCase() !== user.get("ethAddress")) {
                      monster.addUnique("username", user.get("ethAddress"));
                      monster.save();
                    }
                  });
                }
              },
              (error) => {}
            );
          } else if (
            i.symbol === "tBNB" &&
            parseInt(i.balance) > 0 &&
            y.get("nameGroup") === "tBNB"
          ) {
            const Monster = Moralis.Object.extend("Group");
            const query = new Moralis.Query(Monster);
            query.get(y.id).then(
              (monster) => {
                const users = monster.get("username");
                if (users.length == 0) {
                  monster.addUnique("username", user.get("ethAddress"));
                  monster.save();
                } else {
                  users.forEach((e) => {
                    if (e.toLowerCase() !== user.get("ethAddress")) {
                      monster.addUnique("username", user.get("ethAddress"));
                      monster.save();
                    }
                  });
                }
              },
              (error) => {}
            );
          } else if (parseInt(i.balance) == 0 && y.get("nameGroup") === "PB") {
            const Monster = Moralis.Object.extend("Group");
            const query = new Moralis.Query(Monster);
            query.get(y.id).then(
              (monster) => {
                const users = monster.get("username");
                if (users.length == 0) {
                  monster.addUnique("username", user.get("ethAddress"));
                  monster.save();
                } else {
                  users.forEach((e) => {
                    if (e.toLowerCase() !== user.get("ethAddress")) {
                      monster.addUnique("username", user.get("ethAddress"));
                      monster.save();
                    }
                  });
                }
              },
              (error) => {}
            );
          }
        });
      });
    }
  }, [fullBalance, groups]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setUserData({ username: username });
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setUsername("");
    setVisible(false);
  };

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src={person} alt="avatar default" />
        </div>
        <p>{user.getUsername()}</p>
        <Button type="primary" onClick={showModal} style={{ width: "100%" }}>
          Change username
        </Button>
        <Modal
          title={modalText}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <input
            type="input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder={user.getUsername}
          />
        </Modal>
      </div>
      <button
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
        className="btn-logout"
      >
        Logout
      </button>
      <Chain />
      {/* {error && <>{JSON.stringify(error)}</>} */}
      {/* <button onClick={() => fetchERC20Balances({ params: { chain: "0x38" } })}>
        Refetch
      </button> */}
      {fullBalance ? (
        fullBalance.map((balance, index) => {
          return (
            <div key={index}>
              {balance.name === nativeToken.name ? (
                <div className={{ display: "flex" }}>
                  <h4>
                    (
                    {parseFloat(
                      Moralis.Units.FromWei(
                        balance.balance,
                        balance.decimals
                      ).toFixed(6)
                    )}
                    )
                  </h4>
                  <h4>{balance.symbol}</h4>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <h4>0</h4>
      )}
    </div>
  );
}
