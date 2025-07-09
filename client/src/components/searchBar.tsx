import { useState } from 'react';
import axios from 'axios';
import './searchBar.css';

// Back End URL
const apiUrl = import.meta.env.VITE_API_URL;

interface SearchBarProps {
  pair: string;
  setPair: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({pair, setPair}: SearchBarProps) => {

  // Error visible on UI
  const [error, setError] = useState<string>('');

  // Last Trade Price (converted to number)
  const [lastTrade, setLastTrade] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // stops page from reloading
    e.preventDefault();

    // reset error & price
    setError("");
    setLastTrade(null);

    // Check Crypto Pair is correct
    if (!pair || pair.length !== 6) {

      setError('Crypto Pair must be 6 characters')

    } else {

      try {

        const response = await axios.get(`${apiUrl}/api/crypto/ticker/${pair}`)
        console.log(response);
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
          type="submit">
          Update
        </button>
      </form>
      <div>
        {error ?
          <div style={{ color: "red" }}>{error}</div> :
          <div>Last Trade: {lastTrade}</div>
        }
      </div >

    </>
  )

}

export default SearchBar;