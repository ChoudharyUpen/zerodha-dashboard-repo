import React, { useState, useContext } from "react";
//whenver you dont understand code comment some paarts of the code and then see what 
//is happeing u will better understand the code

//axios -- library --jo HTTP requests (GET, POST, PUT, DELETE) bhejne ke liye use hoti hai
//toh tum ise apne project mein API se data lene ya bhejne ke liye use kar sakte ho.
import axios from "axios";

import GeneralContext from "./GeneralContext";

//using material ui (tooltip wo component hai material ui ka jo on hover ata hai )
import { Tooltip, Grow } from "@mui/material";

//this will come from the material icon
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

//import data from data folder and data.js file 
import { watchlist } from "../data/data";

import { DoughnutChart } from "./DoughnoutChart";


//--------------------------------------------------------------
const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //---------------------------------------------------------------

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // datasets: [
  //   {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // ],
  // };

  //-------------------------------------------------------------
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        {/* yaha par value ko dynamic kar diya ye likh kar {watchlist.length} */}
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      {/* ab huma is list ka andar jo data hai usa print karwana hai  */}
      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

//-------------------------------------------------------------
//konsa stock hum currently select kar raha hai 
//ya kis stock par hum currently hover kar raha hai
//or us stock ka liye humra jo item ha menu hai usa open kar dete hai
const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  //below are the two mouseevents
  //2 eventhandlers
  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };


  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      <div className="item">
        {/* Stock Name */}
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          {/* Stock Percent */}

          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          {/* Price of the Stock */}

          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

//----------------------------------------------------------------
//watchlist action component
//uid is used to uniquely identify 
//hum is component mai wo button bana raha hai buy sell jispa click karka kuch hoga
const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        {/* Buy Button Setup */}
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          //grow ka matlab hai it will basically give that effect 
          //ki us button pa click kiya ja raha hai ya hover kiya ja raha hai
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          // Sell Button Setup
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          //thesra option jo huma chaiya wohai chart ya graph
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip
          title="More" placement="top"
          arrow
          TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};


//--------------------------------------------------------------


// import React from "react";

// import {Tooltip, Grow} from "@mui/material";
// import{
//   BarChartOutlined,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   MoreHoriz,
// } from "@mui/icons-material";
// import { watchlist } from "../data/data";

// const WatchList = () => {
//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         <span className="counts"> {watchlist.length} / 50</span>
//       </div>

//       <ul className="list">
//         {watchlist.map((stock, index) => {
//           return <WatchListItem stock={stock} key={index} />;
//         })}
//       </ul>
//     </div>
//   );
// };

// export default WatchList;

// const WatchListItem = ({ stock }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   const handleMouseEnter = (e) => {
//     setShowWatchlistActions(true);
//   };

//   const handleMouseLeave = (e) => {
//     setShowWatchlistActions(false);
//   };

//   return (
//     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="item">
//         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
//         <div className="itemInfo">
//           <span className="percent">{stock.percent}</span>
//           {stock.isDown ? (
//             <KeyboardArrowDown className="down" />
//           ) : (
//             <KeyboardArrowUp className="down" />
//           )}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>
//       {showWatchlistActions && <WatchListActions uid={stock.name} />}
//     </li>
//   );
// };

// const WatchListActions = ({ uid }) => {
//   // const generalContext = useContext(GeneralContext);

//   // const handleBuyClick = () => {
//   //   generalContext.openBuyWindow(uid);
//   // };

//   return (
//     <span className="actions">
//       <span>
//         <Tooltip
//           title="Buy (B)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//           onClick={handleBuyClick}
//         >
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip
//           title="Sell (S)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="sell">Sell</button>
//         </Tooltip>
//         <Tooltip
//           title="Analytics (A)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>
//         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//           <button className="action">
//             <MoreHoriz className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };



// import React from "react";

// const WatchList = () => {
//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         <span className="counts"> 9 / 50</span>
//       </div>

//       <ul className="list"></ul>
//     </div>
//   );
// };

// export default WatchList;


// basiic code of watchlist1 yaha tak sab sahi hai 
//  import React from "react";

// import {Tooltip, Grow} from "@mui/material";

// const WatchList = () => {
//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         { <span className="counts"> 9 / 50</span> }
//       </div>

//       <ul className="list">
//         {/* {watchlist.map((stock, index) => {
//           return <WatchListItem stock={stock} key={index} />;
//         })} */}
//       </ul>
//     </div>
//   );
// };

//  export default WatchList;