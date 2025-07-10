import { useEffect, useState } from "react";
import axios from 'axios';
import {round2} from "../utils/round";

interface CryptoBoardProps {
  pair: string;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface TickerResponseData {
  ask: string;
  bid: string;
  lastTrade: string;
  volume: string;
  vwap: string;
  numTrades: number;
  low: string;
  high: string;
  open: string;
};

// Back End URL
const apiUrl = import.meta.env.VITE_API_URL;

const CryptoBoard = ({ pair, error, setError }: CryptoBoardProps) => {

  // Ticker Data
  const [ask, setAsk] = useState<number | null>(null);
  const [bid, setBid] = useState<number | null>(null);
  const [lastTrade, setLastTrade] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [vwap, setVwap] = useState<number | null>(null);
  const [numTrades, setNumTrades] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  // useEffect to fetch Ticker data from API (dep: active pair)
  useEffect(() => {

    // reset data
    setLastTrade(null);

    const fetchTickerData = async () => {

      try {

        const response = await axios.get(`${apiUrl}/api/crypto/ticker/${pair}`)
        const data: TickerResponseData = response.data;
        console.log(data);
        const {
          ask: fetchedAsk,
          bid: fetchedBid,
          lastTrade: fetchedPrice,
          volume: fetchedVolume,
          vwap: fetchedVwap,
          numTrades: fetchedNumTrades,
          low: fetchedLow,
          high: fetchedHigh,
          open: fetchedOpen
        } = data;

        // update data
        setAsk(Number(fetchedAsk));
        setBid(Number(fetchedBid));
        setLastTrade(Number(fetchedPrice));
        setVolume(round2(Number(fetchedVolume)));
        setVwap(round2(Number(fetchedVwap)));
        setNumTrades(Number(fetchedNumTrades));
        setLow(Number(fetchedLow));
        setHigh(Number(fetchedHigh));
        setOpen(Number(fetchedOpen));




        // reset error
        setError("");

      } catch (error) {

        console.error(error);
        setError(`Failed to fetch ${pair}`)

      }

    }

    fetchTickerData();

  }, [pair])


  return (
    <>
      <h2>Crypto Board</h2>
      <div>{pair}</div>
      <div>
        {error ?
          <div style={{ color: "red" }}>{error}</div> :
          <div>
            <div>Bid/Ask: {bid?.toLocaleString()} / {ask?.toLocaleString()}</div>
            <div>Last Trade: {lastTrade?.toLocaleString()}</div>
            <div />
            <div>Volume traded: {volume?.toLocaleString()}</div>
            <div>Number of Trades: {numTrades?.toLocaleString()}</div>
            <div>Volume Weighted Average Price: {vwap?.toLocaleString()}</div>
            <div />
            <div>Today High: {high?.toLocaleString()}</div>
            <div>Today Low: {low?.toLocaleString()}</div>
            <div>Today Open: {open?.toLocaleString()}</div>
          </div>
        }
      </div >
    </>
  )


}

export default CryptoBoard;