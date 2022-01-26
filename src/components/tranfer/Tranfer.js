import React, { useState } from "react";
import { useWeb3Transfer, useMoralis } from 'react-moralis';
import { Input } from 'antd';
function Tranfer() {
    const { Moralis } = useMoralis()

    const [toAddress, setToAddress] = useState()
    const [amount, setAmount] = useState() 

    const {fetch, error, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount ? amount : "0"),
        receiver: toAddress,
        type: "native",
      });
    
  return <div>
    <Input placeholder="To Address" onChange={(event) => setToAddress(event.target.value)}></Input>
    <Input placeholder="Amount" onChange={(event) => setAmount(event.target.value)}></Input>
    {error && <p>{error}</p>}
    <button onClick={() => fetch()} disabled={isFetching}>Tranfer</button>
  </div>;
}

export default Tranfer;
