import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import ChartContainer from "../components/ChartContainer";
import ChartSettings from '../components/ChartSettings';
import CryptoBoard from '../components/CryptoBoard';
import '../styles/MainPage.css'

const MainPage = () => {

  // Active Crypto pair (e.g. BTCUSD) used in Board and Chart components
  // Passed down as "pair" in child components
  const [activePair, setActivePair] = useState<string>('BTCUSD');

  // Crypto Name (e.g. BTC)
  const crypto = activePair.substring(0, 3);

  // Time frame (interval) in minutes
  // Possible values: [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]
  const [timeFrame, setTimeFrame] = useState(1);

  // Chart Type (User Selection)
  const [chartType, setChartType] = useState<string>('Line');

  return (
    <div className="mainBoard">
      <div className="dataBox">
        <div className="logoBox">
          <img src="/aleph.png" className="alephPic" alt="aleph logo"></img>
          <div className="alephTxt">Aleph</div>
        </div >
        <SearchBar setPair={setActivePair} />
        <div>
          <div >
            <CryptoBoard pair={activePair} />
          </div>
        </div>
      </div>
      <div id="chartBox" className="chartBox">
        <h2>{crypto} Chart</h2>
        <ChartSettings timeFrame={timeFrame} setTimeFrame={setTimeFrame} chartType={chartType} setChartType={setChartType} />
        <ChartContainer pair={activePair} timeFrame={timeFrame} chartType={chartType}/>
      </div>
    </div>
  )

}

export default MainPage;