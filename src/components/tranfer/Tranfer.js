import React, { useState, useEffect } from "react";
import { useWeb3Transfer, useMoralis } from 'react-moralis';
import { Input, Select, Button, Card } from 'antd';
import GetfullBalance from "../hooks/GetfullBalance";
import { Form } from "react-bootstrap";

const { Option } = Select;

function Tranfer() {
    const { Moralis } = useMoralis()
    const { fullBalance } = GetfullBalance()

    const [toAddress, setToAddress] = useState()
    const [amount, setAmount] = useState() 
    const [contractAddress, setContractAddress] = useState()
    
    const { isAuthenticated, isAuthenticating, account, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();

  useEffect(() => {
    // const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(isAuthenticated)
  }, [isAuthenticated, isWeb3Enabled, enableWeb3, isWeb3EnableLoading]);

    const {fetch, error, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount ? amount : "0"),
        receiver: toAddress,
        type: "erc20",
        contractAddress: contractAddress,
      });
    console.log(fullBalance)
  return <div>
  <Card>
  <h3 style={{ textAlign: "center" }}>Tranfer</h3>
    <Input placeholder="To Address" onChange={(event) => setToAddress(event.target.value)}></Input>
    <Form.Control
              as="select"
              className="selection"
              onChange={(event) => {
                setContractAddress(event.target.value);
              }}
            >
              <option value="all">All</option>
              {fullBalance && fullBalance.map((item) => (
                  <option required value={item.token_address} key={item.token_address}>{item.symbol}</option>
                ))}
            </Form.Control>
    {/* <Select style={{width: "20%"}} onChange={(event) => setContractAddress(event.target.value)}>
      <Option>All</Option>
      {fullBalance && fullBalance.map((item) => (
        <Option value={item.token_address}>{item.symbol}</Option>
      ))}
    </Select> */}
    <Input placeholder="Amount" onChange={(event) => setAmount(event.target.value)}></Input>
    <div style={{marginTop: "5%", textAlign: 'center'}}>
    <Button onClick={() => fetch()} disabled={isFetching}>Tranfer</Button>
    </div>
    {error && <p style={{color: 'red'}}>{error.message}</p>}
    </Card>
  </div>;
}

export default Tranfer;
