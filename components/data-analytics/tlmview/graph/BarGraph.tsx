/**
 * @author Olivia Gray
 *
 * @description provides template for bar chart (for comparing individuals' and teams' performance)
 *
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {
  data: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

function getRandomRGB() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
}

const labels = ["Man Hours Set", "Man Hours Completed"];

function BarGraph({ data }: Props) {
  const buildDataset = () => {
    console.log(data);
    let groups = [];
    for (let i = 0; i < data?.length; i++) {
      let group = {
        label: data?.[i]?.id,
        data: [data?.[i]?.manHoursSet, data?.[i]?.manHoursCompleted],
        backgroundColor: getRandomRGB(),
      };
      //console.log(group);
      groups.push(group);
    }

    //console.log(groups);

    let dataset = {
      labels,
      datasets: groups,
    };

    return dataset;
  };

  return <Bar options={options} data={buildDataset()} />;
}

export default BarGraph;
