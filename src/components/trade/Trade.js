import React, { useEffect, useState } from "react";
import { useWeb3Transfer, useMoralis, useMoralisQuery } from "react-moralis";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
function Trade({ quote, toAddress }) {
  const { Moralis, user } = useMoralis();
  const [notify, setNotify] = useState("");

  const { id } = useParams();

  const { data } = useMoralisQuery(
    "Notifies",
    (query) => query.equalTo("groupId", id).limit(1),

    [id],
    {
      live: true,
    }
  );

  // console.log(quote)
  // console.log(parseFloat(Moralis.Units.FromWei(quote ? quote?.fromTokenAmount : "0", quote ? quote?.fromToken?.decimals : "0").toFixed(6)))
  const { fetch, error, isFetching } = useWeb3Transfer();

  useEffect(() => {
    data && data.forEach((e) => {
    if(e.get("status") === "pending") return null
    else if (e.get("status") === "true")
    {
      console.log(e.get("status"))
      if(e.get("fromAddress") === user.get("ethAddress"))
      {
        fetch({ params: {
          amount: e.get("fromAmount"),
          receiver: e.get("toAddress"),
          type: "erc20",
          contractAddress: e.get("fromContractAddress"),}
        })
      }
      if(e.get("toAddress") === user.get("ethAddress"))
      {
        fetch({ params: {
          amount: e.get("toAmount"),
          receiver: e.get("fromAddress"),
          type: "erc20",
          contractAddress: e.get("toContractAddress"),}
        })
      }
    }
  })
  }, [data])

  // ////
  // const {fetch: fetch1, error: error1, isFetching: isFetching1} = useWeb3Transfer({
  //   amount: Moralis.Units.ETH(parseFloat(Moralis.Units.FromWei(quote ? quote?.toTokenAmount : "0", quote ? quote?.fromToken?.decimals : "0").toFixed(6))),
  //   receiver: toAddress,
  //   type: "native",
  //   contractAddress: "",
  // })

  const sendNotify = () => {
    if (!notify) return;

    const Notify = Moralis.Object.extend("Notifies");
    const notifies = new Notify();

    notifies
      .save({
        notify: notify,
        toAddress: toAddress.toLowerCase(),
        fromAddress: user.get("ethAddress"),
        fromAmount: parseFloat(
          Moralis.Units.FromWei(
            quote ? quote?.fromTokenAmount : "0",
            quote ? quote?.fromToken?.decimals : "0"
          ).toFixed(6)
        ),
        fromSymbol: quote ? quote?.fromToken.symbol : "",
        toAmount: parseFloat(
          Moralis.Units.FromWei(
            quote ? quote?.toTokenAmount : "0",
            quote ? quote?.toToken?.decimals : "0"
          ).toFixed(6)
        ),
        toSymbol: quote ? quote?.toToken.symbol : "",
        groupId: id,
        status: "pending",
        fromContractAddress: quote ? quote?.fromToken.address : "",
        toContractAddress: quote ? quote?.toToken.address : "",
      })
      .then(
        (notify) => {},
        (error) => {
          console.log(error.message);
        }
      );
    // endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });

    setNotify("");
  };

  return (
    <div>
      <Input
        placeholder="Notify"
        onChange={(event) => setNotify(event.target.value)}
        style={{ marginTop: "10px" }}
      ></Input>
      {/* {error && <p>{error}</p>} */}
      <Button
        type="submit"
        onClick={sendNotify}
        style={{
          marginTop: "10px",
          width: "100%",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: "#50C9EB",
        }}
      >
        Trade
      </Button>
    </div>
  );
}

export default Trade;
