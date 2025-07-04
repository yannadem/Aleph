import { Request, Response } from 'express';
import axios from 'axios';

interface KrakenTickerResponse {
  error: string[];
  result: {
    [key: string]: {
      c: string[];
    };
  };

}

const getCryptoData = async (req: Request, res: Response): Promise<void> => {

  const pair: string = req.params.pair;

  try {

    const response = await axios.get<KrakenTickerResponse>(`https://api.kraken.com/0/public/Ticker?pair=${pair}`);

    const result = response.data.result;

    // Kraken Ticker for each pair, e.g. XXBTZUSD (BTCUSD)
    const assetTickerInfo = Object.keys(result)[0];

    // Kraken last trade closed
    const lastTrade = result[assetTickerInfo].c[0];


    if (!lastTrade) {
      res.status(404).json(`${pair} lastTrade not found`);
    }

    res.status(200).json({ pair, lastTrade });

  } catch (error) {

    console.log(`getCryptoData error: ${error}`);
    res.status(500).json({ error: `Failed to fetch ${pair}` });

  }
}

export default getCryptoData;

