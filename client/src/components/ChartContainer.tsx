import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import CandleStickChart from './CandleStickChart';

import axios from 'axios';


interface CryptoChartProps {
  pair: string;
  timeFrame: number;
  chartType: string;
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


// Back End URL
const apiUrl = import.meta.env.VITE_API_URL;

const ChartContainer = ({ pair, timeFrame, chartType }: CryptoChartProps) => {

  // state to store OHLC data
  const [chartData, setChartData] = useState<OhlcPoint[]>([]);

  // useEffect to fetch OHLC data from API (dep: pair, timeFrame)
  useEffect(() => {

    const fetchChartData = async () => {

      try {

        const response: OhlcResponse = await axios.get(`${apiUrl}/api/crypto/OHLC/${pair}?interval=${timeFrame}`)
        console.log(response);

        // destructuring response to only keep time & close
        const ohlcData: OhlcPoint[] = response.data.modData;
        // !! chartjs-adapter-date-fns work with time in milliseconds, Kraken data in seconds
        const formattedData: OhlcPoint[] = ohlcData.map((
          { time, open, high, low, close, vwap, volume, count }) =>
          ({ time: time * 1000, open, high, low, close, vwap, volume, count }));

        setChartData(formattedData);


      } catch (error) {

        console.error(`Error fetching OHLC data for ${pair}: ${error}`);

      }

    }

    fetchChartData();

  }, [pair, timeFrame]);


  return (
    <div>
      {chartType === 'Line' &&
        <LineChart pair={pair} chartData={chartData} />
      }
      {chartType === 'Candle Sticks' &&
        <CandleStickChart pair={pair} chartData={chartData} />
      }
    </div>
  );
}

export default ChartContainer;