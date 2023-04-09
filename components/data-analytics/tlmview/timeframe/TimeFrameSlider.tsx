/**
 * 
 * @author Olivia Gray  
 * 
 * @description slider that allows the user to select a timeframe to analyse
 * 
 */

function TimeFrameSlider() {
  return (
    <>
      <label htmlFor="timeFrameSlider" className="form-label">
        Select time frame scale
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="3"
        id="timeFrameSlider"
      />
    </>
  );
}

export default TimeFrameSlider;
