interface ChartSettingsProps {
  timeFrame: number;
  setTimeFrame: React.Dispatch<React.SetStateAction<number>>;
}

const ChartSettings = ({ timeFrame, setTimeFrame }: ChartSettingsProps) => {

  const allowedTimeFrames = [1, 5, 15, 30, 60, 240, 1440, 10080, 21600];

  return (
    <div>
      <label>Time Frame (minutes)</label>
      <select
        value={timeFrame}
        onChange={(e) => setTimeFrame(Number(e.target.value))}
      >
        {allowedTimeFrames.map((el) => (
          <option key={el} value={el}>
            {el} min
          </option>
        ))}
      </select>

    </div>
  )
}

export default ChartSettings;