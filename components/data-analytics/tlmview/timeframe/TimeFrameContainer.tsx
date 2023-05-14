/**
 *
 * @author Olivia Gray
 *
 * @description container for all timeframe components
 *
 */

import TimeFrameSlider from "./TimeFrameSlider";
import TimeFrameToggle from "./TimeFrameToggle";

interface Props {
  onToggleTimeFrame: (useTimeFrame: boolean) => void;
  onChangeTimeFrame?: (timeframe: number) => void;
}

function TimeFrameContainer({ onToggleTimeFrame, onChangeTimeFrame }: Props) {
  const handleSelectToggle = (useTimeFrame: boolean) => {
    onToggleTimeFrame(useTimeFrame);
  };
  const handleSlider = (timeframe: number) => {
    onChangeTimeFrame(timeframe);
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
              <TimeFrameSlider onChangeSlider={handleSlider} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeFrameContainer;
