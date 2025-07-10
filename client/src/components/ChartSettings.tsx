interface ChartSettingsProps {
  timeFrame: number;
  chartType: string;
  setTimeFrame: React.Dispatch<React.SetStateAction<number>>;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
}

const ChartSettings = ({ timeFrame, setTimeFrame, chartType, setChartType }: ChartSettingsProps) => {

  // Possible times frames / time intervals (minutes)
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]
  const allowedTimeFrames = [
    {label: '1 minute', value: 1},
    {label: '5 minutes', value: 5},
    {label: '15 minutes', value: 15},
    {label: '30 minutes', value: 30},
    {label: '1 hour', value: 60},
    {label: '4 hours', value: 240},
    {label: '1 day', value: 1440},
    {label: '1 week', value: 10080},
    {label: '15 days', value: 21600}
  ];

  // Possible Chart Types
  const allowedChartTypes = ['Line','Candle Sticks'];

  return (
    <div>
      <label htmlFor="time-frame-select">Time Frame</label>
      <select
        id="time-frame-select"
        value={timeFrame}
        onChange={(e) => setTimeFrame(Number(e.target.value))}
      >
        {allowedTimeFrames.map((frame) => (
          <option key={frame.label} value={frame.value}>
            {frame.label}
          </option>
        ))}
      </select>
      <label htmlFor="chart-type-select">Chart Type</label>
      <select
        id="chart-type-select"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        {allowedChartTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

    </div>
  )
}

export default ChartSettings;