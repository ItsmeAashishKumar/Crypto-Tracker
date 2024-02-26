import React, { useEffect } from "react";
import ShowStore from "./ShowStore";
import { useParams } from "react-router-dom";
import Header from "./Header";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function Show() {
  const store = ShowStore();
  const params = useParams();

  useEffect(() => {
    store.fetchData(params.id);
  }, []);

  
  return (
    
    <div>
      <Header back/>
      <header className="show-header
      ">
        <div className="show">
          <img width="100px" src={store.d?.image.large}/>
          <h1 className="name">
            {store.d?.name}
            ({store.d?.symbol})
          </h1>
        </div>
        
      </header>

      <div className="graph"><AreaChart
        width={500}
        height={400}
        data={store.graph}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart></div>
      <div className="details">
        <h1>Details</h1>
      </div>
      
      
      <div className="det">
      <div className="det-text">
            <div className="det1">
            <h4>Market cap rank</h4>
            <span>{store.d?.market_cap_rank}</span>
          </div>
          <div className="det2">
            <h4>24h high</h4>
            <span>${store.d?.market_data.high_24h.usd}</span>
          </div>
          <div className="det3">
            <h4>24h low</h4>
            <span>${store.d?.market_data.low_24h.usd}</span>
          </div>
          <div className="det4">
            <h4>Circulating supply</h4>
            <span>${store.d?.market_data.circulating_supply}</span>
          </div>
          <div className="det5">
            <h4>Current price</h4>
            <span>${store.d?.market_data.current_price.usd}</span>
          </div>
          <div className="det6">
            <h4>1y Change</h4>
            <span>{store.d?.market_data.price_change_percentage_1y.toFixed(2)}%</span>
          </div>
      </div>
      </div>
      
      
    </div>
  );
}


