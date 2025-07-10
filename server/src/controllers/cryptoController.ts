import { Request, Response } from 'express';
import axios from 'axios';

interface KrakenTickerResponse {
  error: string[];
  result: {
    [pair: string]: {
      a: string[];
      b: string[];
      c: string[];
      v: string[];
      p: string[];
      t: number[];
      l: string[];
      h: string[];
      o: string;
    };
  };
}

type KrakenOHLCTickData = [
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  number
];

interface KrakenOHLCResponse {
  error: string[];
  result: {
    [pair: string]: KrakenOHLCTickData[]
  } & {
    last: number;
  }
};

// Get Ticker Information
// Last Traded Price - also available: bid & ask, last 24h OHLC, volume, vwap, nb of trades
// https://docs.kraken.com/api/docs/rest-api/get-ticker-information

const getTicker = async (req: Request, res: Response): Promise<void> => {

  // path param
  const { pair } = req.params;

  try {

    const response = await axios.get<KrakenTickerResponse>(`https://api.kraken.com/0/public/Ticker?pair=${pair}`);

    const krakenError = response.data.error;

    // If Kraken returns an error
    if (krakenError.length > 0) {
      res.status(400).json(krakenError);
      return;
    }

    const result = response.data.result;

    // Kraken Ticker for each pair, e.g. XXBTZUSD (BTCUSD)
    const assetTickerInfo = Object.keys(result)[0];

    // Kraken ticker data

    // volumes on [1], [2]
    const ask = result[assetTickerInfo].a[0];
    const bid = result[assetTickerInfo].b[0];
    const lastTrade = result[assetTickerInfo].c[0];

    // [0]= today , [1] = last 24 hours
    const volume = result[assetTickerInfo].v[0];
    const vwap = result[assetTickerInfo].p[0];
    const numTrades = result[assetTickerInfo].t[0];
    const low = result[assetTickerInfo].l[0];
    const high = result[assetTickerInfo].h[0];
    const open = result[assetTickerInfo].o;

    // Success path
    res.status(200).json({ ask, bid, lastTrade, volume, vwap, numTrades, low, high, open});
    console.log(`Ticker data sent for ${pair}`)
    console.log(`open: ${open}`);

  } catch (error) {

    console.error(`getCryptoData error: ${error}`);
    res.status(500).json({ error: `Failed to fetch ticker for ${pair}` });

  }
}

// Get OHLC Data
// https://docs.kraken.com/api/docs/rest-api/get-ohlc-data

const getOHLC = async (req: Request, res: Response) => {

  // Crypto Pair (path param)
  const { pair } = req.params;

  // Query params

  // Time frame interval in minutes
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]

  const { interval } = req.query;
  // Return OHLC entries since the given timestamp
  const { since } = req.query;


  try {

    const response = await axios.get<KrakenOHLCResponse>(`https://api.kraken.com/0/public/OHLC?pair=${pair}&interval=${interval}&since=${since}`);

    // error sent by Kraken API within the response
    const krakenError = response.data.error;

    const result = response.data.result;

    // If Kraken returns an error
    if (krakenError.length > 0) {
      res.status(400).json(krakenError);
      return;
    }


    // Fileter the data, we only want the key = Kraken pair, not 'last' key = metadata
    const assetTickerInfo: string | undefined = Object.keys(result).find(element => element !== 'last');

    // If Kraken returns no data
    if (assetTickerInfo === undefined) {
      res.status(400).json({ error: `No data from Kraken for ${pair}` });
      return;
    }

    // Actual OHLC data (array)
    const dataArr: KrakenOHLCTickData[] = result[assetTickerInfo];

    // Conversion to typed Object

    const modData = dataArr.map((entry) => ({
      time: entry[0],
      open: entry[1],
      high: entry[2],
      low: entry[3],
      close: entry[4],
      vwap: entry[5],
      volume: entry[6],
      count: entry[7],
    }));

    res.status(200).json({ modData });
    console.log(`OHLC data sent for ${pair}`);

  } catch (error) {

    console.error('error fetching OHLC', error);
    res.status(500).json({ error: `Failed to fetch OHLC for ${pair}` });

  }

}





export { getTicker, getOHLC };

