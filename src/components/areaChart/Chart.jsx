import "./chart.scss";
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
    name: "January",
    present: 4000,
    absent: 2400,
    amt: 2400,
  },
  {
    name: "February",
    present: 3000,
    absent: 1398,
    amt: 2210,
  },
  {
    name: "March",
    present: 9000,
    absent: 3800,
    amt: 2290,
  },
  {
    name: "April",
    present: 2780,
    absent: 1908,
    amt: 2000,
  },
  {
    name: "May",
    present: 3890,
    absent: 4500,
    amt: 2181,
  },
  {
    name: "June",
    present: 2390,
    absent: 3800,
    amt: 2500,
  },
  {
    name: "July",
    present: 3490,
    absent: 4300,
    amt: 2100,
  },
  
];

const Chart = () => {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="present"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="absent"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
