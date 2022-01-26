import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Modal, Button } from "antd";

function AddGroup() {
  const { user, Moralis } = useMoralis();
  const [group, setGroup] = useState("");
  const [idGroup, setIdGroup] = useState("");

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Add group");

  // useEffect(() => {
  //   endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  // });
  // const { data } = useMoralisQuery("Group");

  // useEffect(() => {
  //   console.log(data.length)
  //   if (data.length == 0) {
  //     const Group = Moralis.Object.extend("Group");
  //     const groups = new Group();

  //     groups.save({
  //       nameGroup: "ETH",
  //       username: [],
  //     });
  //   }
  // }, [data]);

  const addGroup = () => {
    if (!group) return;

    const Group = Moralis.Object.extend("Group");
    const groups = new Group();

    groups
      .save({
        nameGroup: group,
        username: [user.get("ethAddress")],
        idGroup: idGroup,
      })
      .then(
        (group) => {},
        (error) => {
          console.log(error.message);
        }
      );
    // endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });

    setGroup("");
    setIdGroup("");
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    addGroup();
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setGroup("");
    setIdGroup("");
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ width: "100%" }}>
        <i className="fa fa-plus" style={{ marginRight: "20px" }}></i>
        <span>Add group</span>
      </Button>
      <Modal
        title="Change username"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <p>Name group: </p>
          <input
            type="input"
            onChange={(event) => {
              setGroup(event.target.value);
            }}
            placeholder="Group name"
          />
        </div>
        <div>
          <p>Loại: </p>
          <select
            onChange={(event) => {
              setIdGroup(event.target.value);
            }}
          >
            <option>All</option>
            <option value="0x1">Ethereum</option>
            <option value="0x38">Binance</option>
            <option value="0x61">Smart Chain Testnet</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}

export default AddGroup;
