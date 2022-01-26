import React from 'react';
import { Tabs } from 'antd';
import DEX from '../components/Dex/DEX';

function Trade() {
  
  return <div>
      <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
        <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
          <DEX chain="eth" />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
          <DEX chain="bsc" />
        </Tabs.TabPane>
      </Tabs>
  </div>;
}

export default Trade;
