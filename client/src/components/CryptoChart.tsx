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

interface CryptoChartProps {
  pair: string;
  timeFrame: number;
}

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

interface OhlcResponse {
  data: {
    modData: OhlcPoint[];
  }
}

interface ChartPoint {
  time: number;
  close: string;
}

// Back End URL
const apiUrl = import.meta.env.VITE_API_URL;

const CryptoChart = ({pair, timeFrame}: CryptoChartProps) => {
  console.log(pair,timeFrame);

  // state to store OHLC data
  const [chartData, setChartData] = useState<ChartPoint[]>([]);


  // create reference to <canvas> (DOM node)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect to fetch OHLC data from API (dep: pair, timeFrame)
  useEffect(() => {

    const fetchChartData = async () => {

      try {

        const response : OhlcResponse = await axios.get(`${apiUrl}/api/crypto/OHLC/${pair}?interval=${timeFrame}`)
        console.log(response);

        // destructuring response to only keep time & close
        const ohlcData : OhlcPoint[] = response.data.modData;
        // !! chartjs-adapter-date-fns work with time in milliseconds, Kraken data in seconds
        const formattedData: ChartPoint[] = ohlcData.map(({ time, close }) => ({ time: time * 1000, close }));

        setChartData(formattedData);


      } catch (error) {

        console.error(`Error fetching OHLC data for ${pair}: ${error}`);

      }

    }

    fetchChartData();

  }, [pair, timeFrame]);

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

export default CryptoChart;