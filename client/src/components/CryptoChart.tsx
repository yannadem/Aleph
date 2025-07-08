import {

  // Draw a line chart
  Chart,
  LineController, // Line behaviour - animation
  LineElement, // Colour, width
  PointElement, // point size, hover effect

  // Axes types
  LinearScale, // Y-axis where values increase linearly
  TimeScale, // X-axis displaying time-based data
  CategoryScale, //X-axis with categories (like months, years)

  // UI helpers
  Title,
  Tooltip, // showing tooltip when hovering a point
  Legend,
  Filler, // Fill the area under the line

} from "chart.js";

import 'chartjs-adapter-date-fns';// parse and format UNIX timestamps

// Register components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const CryptoChart = () => {


  return (
    <div>
      <h2>Crypto Chart</h2>
      <canvas id="cryptoChart"></canvas>
    </div>
  );
}

export default CryptoChart;