import BarGraph from "./BarGraph";
import EmptyGraph from "./EmptyGraph";
import ProgressBar from "./ProgressBar";
import "../styles.css";
import LineGraph from "./LineGraph";

/* LOGIC:
    Display progress bar for single employee/team (0)
    Display bar chart for comparing employees/team (1)
    Display line graph for (comparing) employees/team over timeframe (2)
*/

interface Props {
  graphState: number;
}

function GraphContainer({ graphState }: Props) {
  // Decide what graph to display
  const graph =
    graphState === 0 ? (
      <ProgressBar />
    ) : graphState === 1 ? (
      <BarGraph />
    ) : graphState === 2 ? (
      <LineGraph />
    ) : (
      <EmptyGraph />
    );

  return (
    <div className="containerComp" style={{ height: "100%" }}>
      <div style={{ justifyContent: "center" }}>{graph}</div>
    </div>
  );
}

export default GraphContainer;
