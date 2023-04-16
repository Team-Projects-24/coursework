/**
 *
 * @author Olivia Gray
 *
 * @description provides template for progress bar for analysing an individual's or team's performance
 *
 */

interface Props {
  data: any;
}

function ProgressBar({ data }: Props) {
  const calculateWidth = (data: any) => {
    //console.log(data);
    //console.log(typeof data.manHoursCompleted);
    let width = (data?.[0]?.manHoursCompleted / data?.[0]?.manHoursSet) * 100;
    //console.log(width);
    return width;
  };

  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-bar"
        style={{ width: calculateWidth(data) + "%" }}
      ></div>
    </div>
  );
}

export default ProgressBar;
