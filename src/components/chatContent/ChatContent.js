import React, { useEffect, useRef, useState } from "react";
import { useMoralisQuery, useMoralis, useWeb3Transfer } from "react-moralis";
import "./chatContent.css";
import ChatItem from "./ChatItem";
import ChatFooter from "../chatFooter/ChatFooter";
import { useParams } from "react-router-dom";
import ChatHead from "../chatHead/ChatHead";
import { Button, message } from "antd";

const MINS_DURATION = 150000;

export default function ChatContent() {
  const { user, Moralis } = useMoralis();

  const endOfMessagesRef = useRef(null);

  const { id } = useParams();

  const { data } = useMoralisQuery(
    "Messages",
    (query) =>
      query

        .greaterThan(
          "createdAt",
          new Date(Date.now() - 1000 * 60 * MINS_DURATION)
        )
        .equalTo("groupId", id)
        //  .distinct("objectId")
        .ascending("createdAt"),
    [id],
    {
      live: true,
    }
  );

  var result = data.reduce((unique, o) => {
    if (!unique.some((obj) => obj.id === o.id)) {
      unique.push(o);
    }
    return unique;
  }, []);

  const { data: group } = useMoralisQuery(
    "Group",
    (query) => query.equalTo("objectId", id),
    [id]
  );

  const { data: notify } = useMoralisQuery(
    "Notifies",
    (query) => query.equalTo("groupId", id),

    [id],
    {
      live: true,
    }
  );

  console.log(notify)

  const { fetch, error, isFetching } = useWeb3Transfer();

  useEffect(() => {
    notify.length > 0 &&
      notify.forEach((e) => {
        if (e.get("status") === "pending") return null;
        else if (e.get("status") === "true") {
          if (
            e.get("fromAddress") === user.get("ethAddress") &&
            e.get("confirm1") === "false"
          ) {
            console.log("a")
            

           
            // fetch({ params: {
            //   amount: e.get("fromAmount"),
            //   receiver: e.get("toAddress"),
            //   type: "erc20",
            //   contractAddress: e.get("fromContractAddress"),}
            // });
            //   console.log("c"),
            //    query.get(e.id).then(
            //   (monster) => {
            //     monster.set("confirm1", "true");
            //     console.log("d")
            //     return monster.save();
            //   },
            //   (error) => {
            //     console.log(error.message);
            //   }
            // )
            // );
            // Moralis.Cloud.afterSave("EthTransactions", async function(request) {
            //   const confirmed = request.object.get("confirmed");
            //   if (confirmed) {
            //     const Monster = Moralis.Object.extend("Notifies");
            // const query = new Moralis.Query(Monster);
            // query.get(e.id).then(
            //     (monster) => {
            //       monster.set("confirm1", "true");
            //       console.log("d")
            //       return monster.save();
            //     },
            //     (error) => {
            //       console.log(error.message);
            //     }
            //   )
            //   } else {
            //     // handle unconfirmed case
            //   }
            // });
          }
          else if (
            e.get("toAddress") === user.get("ethAddress") &&
            e.get("confirm2") === "false"
          ) {
            console.log("b")
            // const Monster = Moralis.Object.extend("Notifies");
            // const query = new Moralis.Query(Monster);

            
            // fetch({ params: {
            //   amount: e.get("toAmount"),
            //   receiver: e.get("fromAddress"),
            //   type: "erc20",
            //   contractAddress: e.get("toContractAddress"),}
            // }).then(
            //   console.log("e"),
            //   query.get(e.id).then(
            //   (monster) => {
            //     monster.set("confirm2", "true");
            //     console.log("f")
            //     return monster.save();
            //   },
            //   (error) => {
            //     console.log(error.message);
            //   }
            // )
            // );

            
          }
        }
      });
  }, [notify]);

  const handleSubmit = async (id) => {
    const Monster = Moralis.Object.extend("Notifies");
    const query = new Moralis.Query(Monster);

    query.get(id).then(
      (monster) => {
        monster.set("status", "true");
        return monster.save();
      },
      (error) => {
        console.log(error.message);
      }
    );
    // query.equalTo("objectId", id)
    // const results = await query.find();

    //   fetch({
    //     amount: results[0].get("toAmount"),
    //     receiver: results[0].get("fromAddress"),
    //     type: "erc20",
    //     contractAddress: results[0].get("toContractAddress"),
    //   })
  };

  const handleCancel = async (id) => {
    const Monster = Moralis.Object.extend("Notifies");
    const query = new Moralis.Query(Monster);

    query.get(id).then(
      (monster) => {
        monster.set("status", "false");
        return monster.save();
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  return (
    <div className="main__chatcontent">
      {id ? (
        <>
          {group ? (
            group.map((item) => <ChatHead group={item} key={item.id} id={id} />)
          ) : (
            <></>
          )}
          <div className="content__body">
            <div className="chat__items">
              {result.map((message, index) => (
                <ChatItem
                  key={message.id}
                  message={message}
                  animationDelay={index + 2}
                />
              ))}
              <div ref={endOfMessagesRef}></div>
            </div>
          </div>
          <ChatFooter endOfMessagesRef={endOfMessagesRef} id={id} />
          {/* <div ref={endOfMessagesRef} className='text-wel'>
                <p>You're up to date !</p>
            </div> */}
        </>
      ) : (
        <></>
      )}
      {notify &&
        notify.map((e) => (
          <div
            className={e.get("status") === "pending" ? "" : "trade_none"}
            key={e.id}
          >
            <p>ObjectId: {e.id}</p>
            <p>to: {e.get("toAddress")}</p>
            <p>from: {e.get("fromAddress")}</p>
            <p>
              from Amount: {e.get("fromAmount")} {e.get("fromSymbol")}
            </p>
            <p>
              to Amount: {e.get("toAmount")} {e.get("toSymbol")}
            </p>
            <div style={{ display: "flex" }}>
              <Button onClick={() => handleSubmit(e.id)}>OK</Button>
              <Button onClick={() => handleCancel(e.id)}>Cancel</Button>
            </div>
          </div>
        ))}
    </div>
  );
}
