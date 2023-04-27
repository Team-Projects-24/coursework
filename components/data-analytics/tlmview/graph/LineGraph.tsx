/**
 *
 * @author Olivia Gray
 *
 * @description provides template for line graph for analysing performance over a given time frame
 *
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface Props {
  data: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Chart.js Line Chart",
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

export function LineGraph({ data }: Props) {
  const buildDataset = () => {
    // want a separate dataset for each user / team
    // labels will be each unique date value in given data
    console.log(data);

    let labels: string[] = [];
    let datasetNames: string[] = [];
    for (let i = 0; i < data.length; i++) {
      // date from db comes in datetime format - I only want date
      let date = data?.[i]?.date;
      if (!labels.includes(date?.slice(0, 10))) {
        labels.push(date?.slice(0, 10));
      }
      let name = data?.[i]?.id;
      if (!datasetNames.includes(name)) {
        datasetNames.push(name);
      }
    }
    //console.log(labels);

    // Now build dataset
    let groups = [];
    for (let i = 0; i < datasetNames.length; i++) {
      // Build dataset for each user or team
      let groupData = new Array(labels.length).fill(0);
      for (let j = 0; j < data.length; j++) {
        if (data?.[j]?.id === datasetNames[i]) {
          let index = labels.indexOf(data?.[j]?.date?.slice(0, 10));
          groupData[index] = data?.[j]?.manHoursCompleted;
        }
      }
      let group = {
        label: datasetNames[i],
        data: groupData,
        borderColor: getRandomRGB(),
        backgroundColor: getRandomRGB(),
      };
      groups.push(group);
    }

    console.log(groups);

    let dataset = { labels, datasets: groups };

    console.log(dataset);

    return dataset;
  };

  return <Line options={options} data={buildDataset()} />;
}

export default LineGraph;
