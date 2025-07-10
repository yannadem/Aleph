import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import CryptoChart from "../components/CryptoChart";
import ChartSettings from '../components/ChartSettings';
import CryptoBoard from '../components/CryptoBoard';
import '../styles/MainPage.css'

const MainPage = () => {

  // Active Crypto pair (e.g. BTCUSD) used in Board and Chart components
  // Passed down as "pair" in child components
  const [activePair, setActivePair] = useState<string>('BTCUSD');
  const crypto = activePair.substring(0,3);

  // Time frame (interval) in minutes
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]
  const [timeFrame, setTimeFrame] = useState(1);

  return (
    <div>
      <div className="logoBox">
        <img src="/aleph.png" className="alephPic" alt="aleph logo"></img>
        <div className="alephTxt">Aleph</div>
      </div >
      <SearchBar setPair={setActivePair}></SearchBar>
      <div id="mainBoard" className="mainBoard">
        <div id="dataBox" className="dataBox">
          <CryptoBoard pair={activePair}></CryptoBoard>
        </div>
        <div id="chartBox" className="chartBox">
          <h2>{crypto} Chart</h2>
          <ChartSettings timeFrame={timeFrame} setTimeFrame={setTimeFrame}></ChartSettings>
          <CryptoChart pair={activePair} timeFrame={timeFrame}></CryptoChart>
        </div>
      </div>
    </div>
  )

}

export default MainPage;