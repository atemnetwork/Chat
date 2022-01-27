import React, { useMemo, useEffect } from 'react';
import {
    useMoralis,
    useERC20Balances,
    useNativeBalance,
  } from "react-moralis";

export default function GetfullBalance() {
    const { user, chainId } = useMoralis();
  const { fetchERC20Balances, data } = useERC20Balances();
  useEffect(() => {
    fetchERC20Balances({
      params: { chain: chainId },
    });
  }, [chainId, fetchERC20Balances, user]);

  const { data: nativeBalance, nativeToken } = useNativeBalance();
  
  const fullBalance = useMemo(() => {
    if (!data || !nativeBalance) return null;
    return [
      ...data,
      {
        balance: nativeBalance.balance,
        decimals: nativeToken.decimals,
        name: nativeToken.name,
        symbol: nativeToken.symbol,
        token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      },
    ];
  }, [data]);

  console.log(fullBalance)
  return { fullBalance };
}
