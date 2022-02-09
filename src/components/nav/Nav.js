import React, { Component } from "react";
import "./nav.css";
// import logo from "./../../images/logo.png";
import eth from "../../images/eth.jpg";
import bsc from "../../images/bsc.png";
import btc from "../../images/bitcoin.png";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__logo">
          <img alt="logo"></img>
        </div>
        <div className="nav__blocks">
          <img src={eth} alt="eth"></img>
        </div>
        <div className="nav__blocks">
          <img src={btc} alt="btc"></img>
        </div>
        <div className="nav__blocks">
          <img src={bsc} alt="bsc"></img>
        </div>
        {/* <div className="btn-nft">
          <Link to="/nft">
            NFT
          </Link>
        </div> */}
        {/* <div className="btn-trade">
          <Link to="/trade">
            Trade
          </Link>
        </div>
        <div className="btn-transfer">
          <Link to="/tranfer">
            Tranfer
          </Link>
        </div> */}
        <div className="show_icon">
          {/* <i className="fa fa-clipboard-list"></i> */}
          <i className="fa fa-bell"></i>
          <i className="fa fa-plus-circle"></i>
          {/* <i className="fa fa-clipboard-list"></i> */}
          <i className="fa fa-clipboard"></i>
        </div>
      </div>
    );
  }
}
