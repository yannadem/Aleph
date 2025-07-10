import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import CryptoChart from "../components/CryptoChart";
import ChartSettings from '../components/ChartSettings';
import CryptoBoard from '../components/CryptoBoard';

const MainPage = () => {

  // Active Crypto pair (e.g. BTCUSD) used in Board and Chart components
  // Passed down as "pair" in child components
  const [activePair, setActivePair] = useState<string>('BTCUSD');

  // Time frame (interval) in minutes
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]
  const [timeFrame, setTimeFrame] = useState(1);

  // Error visible on UI
  const [error, setError] = useState<string>('');

  return (
    <div>
      <div className="logoBox">
        <img src="/aleph.png" className="alephPic" alt="aleph logo"></img>
        <div className="alephTxt">Aleph</div>
      </div >
      <SearchBar setError={setError} setPair={setActivePair}></SearchBar>
      <CryptoBoard pair={activePair} error={error} setError={setError}></CryptoBoard>
      <CryptoChart pair={activePair} timeFrame={timeFrame}></CryptoChart>
      <ChartSettings timeFrame={timeFrame} setTimeFrame={setTimeFrame}></ChartSettings>
    </div>
  )

}

export default MainPage;