
import SearchBar from './components/SearchBar'
import CryptoChart from './components/CryptoChart'
import './App.css'

function App () {


  return (
    <>
      <div className="logoBox">
        <img src="/aleph.png" className="alephPic"></img>
        <div className="alephTxt">Aleph</div>
      </div >
      <div></div>
      <SearchBar></SearchBar>
      <CryptoChart></CryptoChart>
    </>
  )
}

export default App
