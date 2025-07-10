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

// CandleStickChart
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

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
  CandlestickController,
  CandlestickElement,
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

interface CandleStickChartProps {
  pair: string;
  chartData: OhlcPoint[];
}

// interface CandleStickPoint {
//   x: number;
//   o: number;
//   h: number;
//   l: number;
//   c: number;
// }



const CandleStickChart = ({ pair, chartData }: CandleStickChartProps) => {

  // create reference to <canvas> (DOM node)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect to Create Line Chart once canvas DOM has rendered (dep: OHLCData)
  useEffect(() => {

    // Wait for <canvas> to be rendered
    if (!canvasRef.current || chartData.length === 0) {
      return;
    }

    // transform OHLC data for Candle Stick Chart {x: num, o: num, h: num, l: num, c: num}
    const candleData = chartData.map(({ time, open, high, low, close }) => ({

      x: Number(time),
      o: Number(open),
      h: Number(high),
      l: Number(low),
      c: Number(close)

    }))

    const modChartData = {
      datasets: [
        {
          label: pair,
          data: candleData,
          borderColor: 'black',
          color: {
            up: 'green',
            down: 'red',
            unchanged: 'blue',
          }
        },
      ],
    };

    // Side effect: create a new chart on canvas
    const myChart2 = new Chart(canvasRef.current, {
      type: 'candlestick',
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
      myChart2.destroy();
    };

    // rerun useEffect when ChartData is updated
  }, [chartData]);


  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default CandleStickChart;