import "./funnel.scss";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
} from "recharts";

const data = [
  {
    value: 100,
    name: "Fauzan",
    fill: "#8884d8",
  },
  {
    value: 80,
    name: "Rizal",
    fill: "#83a6ed",
  },
  {
    value: 50,
    name: "Ricky",
    fill: "#8dd1e1",
  },
  {
    value: 40,
    name: "Alif",
    fill: "#82ca9d",
  },
  {
    value: 26,
    name: "Zod",
    fill: "#a4de6c",
  },
];

const Chart2 = () => {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart width={730} height={250}>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart2;
