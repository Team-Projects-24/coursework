import TimeFrameSlider from "./TimeFrameSlider";
import TimeFrameToggle from "./TimeFrameToggle";

interface Props {
  onToggleTimeFrame: (useTimeFrame: boolean) => void;
}

function TimeFrameContainer({ onToggleTimeFrame }: Props) {
  const handleSelectToggle = (useTimeFrame: boolean) => {
    onToggleTimeFrame(useTimeFrame);
  };

  return (
    <>
      <div className="containerComp">
        <p>Time Frame</p>
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col">
              <TimeFrameToggle onSelectToggle={handleSelectToggle} />
            </div>
            <div className="col">
              <TimeFrameSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeFrameContainer;
