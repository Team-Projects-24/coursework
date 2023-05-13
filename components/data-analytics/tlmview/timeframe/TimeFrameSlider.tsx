/**
 *
 * @author Olivia Gray
 *
 * @description slider that allows the user to select a timeframe to analyse
 *
 */

import { useState } from "react";

interface Props {
  onChangeSlider: (timeframe: number) => void;
}

function TimeFrameSlider({ onChangeSlider }: Props) {
  const [timeframe, setTimeFrame] = useState(0);

  const handleSliderChange = (event) => {
    //console.log("changing slider", event.target.value);
    setTimeFrame(event.target.value);
    onChangeSlider(event.target.value);
  };

  return (
    <>
      <label htmlFor="timeFrameSlider" className="form-label">
        Select time frame scale
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="2"
        value={timeframe}
        id="timeFrameSlider"
        onChange={handleSliderChange}
      />
    </>
  );
}

export default TimeFrameSlider;
