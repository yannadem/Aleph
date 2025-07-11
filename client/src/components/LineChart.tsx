import { useEffect, useRef } from 'react';

import {
  Chart,
  LineController, // Line behaviour - animation
  LineElement, // Colour, width
  PointElement, // point size, hover effect

  LinearScale, // Y-axis where values increase linearly
  TimeScale, // X-axis displaying time-based data
  CategoryScale, //X-axis with categories (like months, years)

  Title,
  Tooltip, // showing tooltip when hovering a point
  Legend,
  Filler, // Fill the area under the line
} from "chart.js";

import 'chartjs-adapter-date-fns'; // parse and format UNIX timestamps

// Register chart.js components
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

interface OhlcPoint {
  time: number;
  open: string;
  high: string;
  low: string;
  close: string;
  vwap: string;
  volume: string;
  count: number;
}

interface LineChartProps {
  pair: string;
  chartData: OhlcPoint[];
}


const LineChart = ({pair, chartData}: LineChartProps) => {


  // create reference to <canvas> (DOM node)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  // useEffect to Create Line Chart once canvas DOM has rendered (dep: OHLCData)
  useEffect(() => {

    // Wait for <canvas> to be rendered
    if (!canvasRef.current || chartData.length === 0) {
      return;
    }

    // Assign Data on axis
    const xAxis = chartData.map(({ time }) => time);
    const yAxis = chartData.map(({ close }) => close);

    const modChartData = {
      labels: xAxis,
      datasets: [
        {
          label: pair,
          data: yAxis,
          borderColor: 'blue',
          fill: false,
        },
      ],
    };

    // Side effect: create a new chart on canvas
    const myChart = new Chart(canvasRef.current, {
      type: 'line',
      data: modChartData,
      options: {
        responsive: true, // resize the chart with canvas
        scales: {
          x: {
            type: 'time',
          },
        },
        animation: false,
      },

    })

    // Clean up the chart when react unmounts component
    return () => {
      myChart.destroy();
    };

    // rerun useEffect when ChartData or Pair or timeFrame is updated
  }, [chartData]);


  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default LineChart;