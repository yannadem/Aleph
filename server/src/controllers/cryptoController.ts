import { Request, Response } from 'express';
import axios from 'axios';

const pair: string = 'BTCUSD';
const assetTickerInfo: string = 'XXBTZUSD';

interface KrakenTickerResponse {
  error: string[];
  result: {
    [assetTickerInfo: string]: {
      c: string[];
    };
  };

}

const getCryptoData = async (req: Request, res: Response): Promise<void> => {

  try {

    const response = await axios.get<KrakenTickerResponse>(`https://api.kraken.com/0/public/Ticker?pair=${pair}`);

    const data = response.data;
    const lastTrade = data.result?.XXBTZUSD?.c[0]; // last trade closed

    if(!lastTrade){
      res.status(404).json('Price not found');
    }

    res.status(200).json({pair, lastTrade});

  } catch (error) {

    console.log(`getCryptoData error: ${error}`);
    res.status(500).json({ error: `Failed to fetch ${pair}` });

  }
}

export default getCryptoData;

