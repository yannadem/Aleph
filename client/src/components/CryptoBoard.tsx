import { useEffect, useState } from "react";
import axios from 'axios';
import { round2 } from "../utils/round";

interface CryptoBoardProps {
  pair: string;
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

const CryptoBoard = ({ pair }: CryptoBoardProps) => {

  // crypto & currency
  const crypto = pair.substring(0, 3);
  const ccy = pair.substring(3, 6);

  // Fetching Error visible on UI
  const [error, setError] = useState<string>('');

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
        setError('');

      } catch (error) {

        console.error(error);
        setError(`Failed to fetch ${pair}`)

      }

    }

    fetchTickerData();

  }, [pair])


  return (
    <>
      <h2>1 {crypto} = {lastTrade?.toLocaleString()} {ccy}</h2>
      <div>
        {error ?
          <div style={{ color: "red" }}>{error}</div> :
          <div>
            <h3>{crypto} Today</h3>
            <table>
              <tbody>
                <tr>
                  <td>Bid/Ask</td>
                  <td>{bid?.toLocaleString()} / {ask?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Last Trade</td>
                  <td>{lastTrade?.toLocaleString()}</td>
                </tr>
                <tr><td colSpan={2}>&nbsp;</td></tr>
                <tr>
                  <td>Volume traded </td>
                  <td>{volume?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Num of Trades</td>
                  <td>{numTrades?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>VWAP</td>
                  <td>{vwap?.toLocaleString()}</td>
                </tr>
                <tr><td colSpan={2}>&nbsp;</td></tr>
                <tr>
                  <td>Today High</td>
                  <td>{high?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Today Low</td>
                  <td>{low?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Today Open</td>
                  <td>{open?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div >
    </>
  )


}

export default CryptoBoard;