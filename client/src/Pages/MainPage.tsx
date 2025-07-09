import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import CryptoChart from "../components/CryptoChart";
import ChartSettings from '../components/ChartSettings';
import CryptoBoard from '../components/CryptoBoard';

const MainPage = () => {

  // Crypto pair e.g. BTCUSD
  const [pair, setPair] = useState<string>('BTCUSD');

  // Time frame (interval) in minutes
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]
  const [timeFrame, setTimeFrame] = useState(1);

  return (
    <div>
      <div className="logoBox">
        <img src="/aleph.png" className="alephPic" alt="aleph logo"></img>
        <div className="alephTxt">Aleph</div>
      </div >
      <SearchBar pair={pair} setPair={setPair}></SearchBar>
      <CryptoBoard pair={pair}></CryptoBoard>
      <CryptoChart pair={pair} timeFrame={timeFrame}></CryptoChart>
      <ChartSettings timeFrame={timeFrame} setTimeFrame={setTimeFrame}></ChartSettings>
    </div>
  )

}

export default MainPage;