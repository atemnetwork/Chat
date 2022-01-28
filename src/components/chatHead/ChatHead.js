import React, { useState } from "react";
import "./chatHead.css";
import Avatar from "../chatList/Avatar";
import person from "../../images/person default.jpg";
import { Modal, Button } from "antd";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
// import { Dropdown } from 'react-bootstrap';
import { Menu, Dropdown } from 'antd';

function ChatHead({ group, id }) { 
  const users = group.get("username");
  const [visibleDrop, setVisibleDrop] = useState(false);
  const { user, Moralis } = useMoralis()

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Change username");
  const [toAddress, setToAddress] = useState("");

  const addMember = (toAddress) => {
    const Monster = Moralis.Object.extend("Group");
    const query = new Moralis.Query(Monster);
    query.get(id).then(
      (monster) => {
        const users = monster.get("username");
        if (users.length == 0) {
          monster.addUnique("username", toAddress.toLowerCase());
          monster.save();
        } else {
          users.forEach((e) => {
            if (e.toLowerCase() !== toAddress) {
              monster.addUnique("username", toAddress.toLowerCase());
              monster.save();
            }
          });
        }
      },
      (error) => {}
    );
    setToAddress("")
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    addMember(toAddress);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setToAddress("");
    setVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
      <Button type="primary" onClick={showModal} style={{ width: "100%" }}>
          Add member
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
              setToAddress(event.target.value);
            }}
            placeholder="Input walletId"
          />
        </Modal>
    </Menu.Item>
    <Menu.Item key="1">
    <Button type="primary" style={{ width: "100%" }}><Link to={`/chat/${id}/trade`}>Trade</Link></Button>
    </Menu.Item>
    </Menu>
  )

  return (
    <div className="content__header">
      <div className="blocks">
        <div className="current-chatting-user">
          {users.map((e) => (
            <Avatar isOnline="active" image={person} key={e} />
          ))}
          <p>{group.get("nameGroup")}</p>
        </div>
      </div>

      <div className="blocks">
        <div className="settings">
        <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    <i className="fa fa-cog"></i>
    </a>
  </Dropdown>
        </div> 
      </div>
    </div>
  );
}

export default ChatHead;
