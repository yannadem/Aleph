import { useState } from 'react';
import axios from 'axios';


const SearchBar = () => {

  // Error visible on UI
  const [error, setError] = useState<string>('');

  // Crypto pair e.g. BTCUSD
  const [pair, setPair] = useState<string>('');

  // Last Trade Price (converted to number)
  const [lastTrade, setLastTrade] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // stops page from reloading
    e.preventDefault();

    // clear any previous error
    setError("");

    // Check Crypto Pair is correct
    if (!pair || pair.length !== 6) {

      setError("Crypto Pair must be 6 characters")

    } else {

      try {

        const response = await axios.get(`http://localhost:3000/api/crypto/${pair}`)
        const { lastTrade: fetchedPrice } = response.data;
        setLastTrade(Number(fetchedPrice));

      } catch (error) {

        console.error(error);
        setError(`Failed to fetch ${pair}`)

      }

    }

  }

  return (
    <>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='BTCUSD'
          value={pair}
          onChange={(e) => setPair(e.target.value.toUpperCase())}
        >
        </input>
        <button
          type='submit'>
          Search
        </button>
      </form>
      <div>
        {error ?
          <div style={{ color: 'red' }}>{error}</div> :
          <div>Last Trade: {lastTrade}</div>
        }
      </div >

    </>
  )

}

export default SearchBar;