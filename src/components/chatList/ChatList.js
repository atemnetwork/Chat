import React, { useEffect } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
// import eth from "../../images/eth.jpg";
// import btc from "../../images/bitcoin.png";
import { useMoralisQuery, useMoralis } from 'react-moralis'
import AddGroup from "../addGroup/AddGroup";

export default function ChatList() {
  // allChatUsers = [
  //   {
  //     image:
  //      eth,
  //     id: 1,
  //     name: "Group 1",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       btc,
  //     id: 2,
  //     name: "Group 2",
  //     active: false,
  //     isOnline: false,
  //   },
  // ];

  const { user } = useMoralis()

    const { data } = useMoralisQuery(
    "Group",
    query => query.contains("username", user.get("ethAddress")),
    [user],
    {
      live: true
    }
  );  

  // console.log(data[0].get("users"))

    return (
      <div className="main__chatlist">
        {/* <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button> */}
        <AddGroup />
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {data.map((item, index) => {
            return (
              <ChatListItems
                item={item}
                key={item.id}
                // animationDelay={index + 1}
                // active={item.active ? "active" : ""}
                // isOnline={item.isOnline ? "active" : ""}
                // image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
