// import { useMoralis, useERC20Balances, useNFTBalances } from "react-moralis";
// import React, { useState, useEffect } from "react";
// import DataTable from "../components/DataTable";
// // import ERC20Balances from './ERC20Balance';
// import "./index.css";
// import { Navigate } from "react-router-dom";

// function Index() {
//   const { user, logout, isAuthenticated, isAuthenticating } = useMoralis();

//   const { fetchERC20Balances, data, isLoading, error } = useERC20Balances();

//   const { getNFTBalances, data: getNFT, error: errorNFT } = useNFTBalances();

//   // const [address, setAddress] = useState("")

//   const [net, setNet] = useState("bsc");

//   // async function getData() {}
//   // const options = { chain: 'bsc'}
//   // const bsc = await Moralis.Web3API

//   // const handleFetching = (e) => {
//   //   e.preventDefault();
//   //   fetchERC20Balances({ params: { chain: net } });
//   // };

//   useEffect(() => {
//     fetchERC20Balances({ params: { chain: net } });
//     console.log(data);

//     console.log("User from index", user);
//   }, [fetchERC20Balances]);

//   return (
//     <div className="App">
//       {isAuthenticating ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {!isAuthenticated ? (
//             <Navigate to="/" />
//           ) : (
//             <>
//               <div className="nav">
//                 <h4>Wellcome {user.get("ethAddress")}</h4>
//                 <button onClick={() => logout()} className="btn-logout">
//                   Logout
//                 </button>
//               </div>
//               <div className="body">
//                 <div className="data">
//                   {error && <>{JSON.stringify(error)}</>}
//                   <label>Choose</label>
//                   <select
//                     onChange={(event) => {
//                       setNet(event.target.value);
//                     }}
//                   >
//                     <option value="bsc">Bsc</option>
//                     <option value="eth">Eth</option>
//                     <option value="bsc testnet">Bsc Testnet</option>
//                     <option value="kovan">Kovan</option>
//                   </select>
//                   {/* <button onClick={(e) => handleFetching(e)} className="fetchCoin">
//                 Refetch
//               </button> */}
//                   {isLoading ? <p>Pls wait</p> : <DataTable data={data} />}
//                   {errorNFT && <>{JSON.stringify(errorNFT)}</>}
//                   <button
//                     onClick={() =>
//                       getNFTBalances({
//                         params: {
//                           chain: "",
//                           address: "0x0ed1e02164a2a9fad7a9f9b5b9e71694c3fad7f2",
//                         },
//                       })
//                     }
//                   >
//                     Refetch NFTBalances
//                   </button>
//                   <pre>{JSON.stringify(getNFT, null, 2)}</pre>
//                 </div>
//               </div>
//               <a href="/chat" className="bg-blue-600 text-black ml-4 btn">
//                 Chat now
//               </a>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Index;
