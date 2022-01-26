import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
// import Avatar from "./Avatar";

export default function ChatListItems({ item }) {
  // const { user } = useMoralis();

  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   const users = item.get("username");
  //   if (users) {
  //     users.forEach((e) => {
  //       if (e.toLowerCase() === user.get("ethAddress")) {
  //         setVisible(true);
  //       }
  //     });
  //   }
  // }, [user, item]);

  return (
    <div className="group">
          <Link to={`/chat/${item.id}`} className="group_btn">
            {item.get("nameGroup")}
          </Link>
    </div>
  );
}
