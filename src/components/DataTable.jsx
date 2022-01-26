// import React from 'react'
// import {Table} from 'react-bootstrap'
// import { Navigate } from 'react-router-dom'

// function DataTable({data}) {

//   function Price({props}) {
//     const price = props.balance / ('1e' + props.decimals)
//     return(
//       <td>{price}</td>
//     )
//   }

//     return (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Token Address</th>
//               <th>Name</th>
//               <th>Symbol</th>
//               <th>Balance</th>
//               <th>Format</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data ? 
//               data.map((item) => {
//                 return(
//               <tr key={item.token_address}>
//               <td>{item.token_address}</td>
//               <td>{item.name}</td>
//               <td>{item.symbol}</td>
//               <td>{item.balance}</td>
//               {/* {item.balance != 0 ? <Navigate to="/chat" /> : <></>} */}
//               <Price props={item} />
//               </tr>)
//               }) : <tr>Not found</tr>}
//             {/* <tr>
//               <td>1</td>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Jacob</td>
//               <td>Thornton</td>
//               <td>@fat</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr> */}
//           </tbody>
//         </Table>
//     )
// }

// export default DataTable
