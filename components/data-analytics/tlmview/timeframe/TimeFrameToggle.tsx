/**
 * 
 * @author Olivia Gray
 * 
 * @description checkbox that (de)selects analysing performance over a timeframe
 * 
 */

import { useState } from "react";

interface Props {
  onSelectToggle: (useTimeFrame: boolean) => void;
}

function TimeFrameToggle({ onSelectToggle }: Props) {
  const [useTimeFrame, setUseTimeFrame] = useState(false);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="timeFrameToggle"
        onChange={() => {
          let newState = !useTimeFrame;
          setUseTimeFrame(newState);
          onSelectToggle(newState);
        }}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Check to enable time frame
      </label>
    </div>
  );
}

export default TimeFrameToggle;
