import { useState } from 'react';
import '../styles/searchBar.css';

interface SearchBarProps {
  // Set Active Pair
  setPair: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({setPair, setError}: SearchBarProps) => {

  // Input Crypto pair: the pair typed by User in search bar
  const [inputPair, setInputPair] = useState<string>('BTCUSD');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // stops page from reloading
    e.preventDefault();

    // Check Input Crypto Pair is correct
    if (!inputPair || inputPair.length !== 6) {

      // Communication to User
      setError('Crypto Pair must be 6 characters')

    } else {

      // Update Active Pair = Input Pair
      setPair(inputPair);
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='BTCUSD'
          value={inputPair}
          onChange={(e) => setInputPair(e.target.value.trim().toUpperCase())}
        />
        <button
          type="submit">
          Update
        </button>
      </form>
    </>
  )

}

export default SearchBar;