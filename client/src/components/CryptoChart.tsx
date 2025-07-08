import { useState, useEffect, useRef } from 'react';

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
import axios from 'axios';

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

interface ChartPoint {
  time: number;
  // open: number;
  // high: number;
  // low: number;
  close: number;
}

// Back End URL
const apiUrl = import.meta.env.VITE_API_URL;

const CryptoChart = () => {

  // place holder for pair / interval
  const [pair, setPair] = useState('BTCUSD');
  const [interval, setInterval] = useState(1);
  // setPair('ETHUSD');
  // setInterval(1);

  // state to store OHLC data
  const [chartData, setChartData] = useState<ChartPoint[]>([]);


  // create reference to <canvas> (DOM node)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect to fetch OHLC data from API
  useEffect(() => {

    const fetchChartData = async () => {

      try {

        const response = await axios.get<ChartPoint[]>(`${apiUrl}/api/crypto/OHLC/${pair}?interval=${interval}`)

        // destructuring response to only keep time & close
        const formattedData: ChartPoint[] = response.data['modData'].map(({ time, close }) => ({ time, close }));

        setChartData(formattedData);


      } catch (error) {

        console.error(`Error fetching OHLC data for ${pair}: ${error}`);

      }

    }

    fetchChartData();

  }, []);

  // useEffect to Create Line Chart once canvas DOM has rendered
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
      },

    })

    // Clean up the chart when react unmounts component
    return () => {
      myChart.destroy();
    };

    // rerun useEffect when ChartData is updated
  }, [chartData, pair, interval]);


  return (
    <div>
      <h2>Crypto Chart</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default CryptoChart;