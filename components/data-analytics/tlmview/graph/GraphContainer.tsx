/**
 *
 * @author Olivia Gray
 *
 * @description provides container for graphs and contains logic for selecting graph type
 *
 */

import BarGraph from "./BarGraph";
import EmptyGraph from "./EmptyGraph";
import ProgressBar from "./ProgressBar";
import LineGraph from "./LineGraph";
import styles from "styles/analytics.module.css";

/* LOGIC:
    Display progress bar for single employee/team (0)
    Display bar chart for comparing employees/team (1)
    Display line graph for (comparing) employees/team over timeframe (2)
*/

interface Props {
  graphState: number;
  data: any;
}

function GraphContainer({ graphState, data }: Props) {
  // Decide what graph to display
  const graph =
    graphState === 0 ? (
      <ProgressBar data={data} />
    ) : graphState === 1 ? (
      <BarGraph />
    ) : graphState === 2 ? (
      <LineGraph />
    ) : (
      <EmptyGraph />
    );

  return (
    <div className="containerComp" style={{ height: "100%" }}>
      <div className="graphContainer">{graph}</div>
    </div>
  );
}

export default GraphContainer;
