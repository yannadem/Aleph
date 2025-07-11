import { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  // Set Active Pair
  setPair: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({setPair}: SearchBarProps) => {

  // Input Crypto pair: the pair typed by User in search bar
  const [inputPair, setInputPair] = useState<string>('BTCUSD');

  // Pair Validation Error
  const [errorPair, setErrorPair] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // stops page from reloading
    e.preventDefault();

    // Check Input Crypto Pair is correct
    if (!inputPair || inputPair.length !== 6) {

      // Communication to User
      setErrorPair('Crypto Pair must be 6 characters')

    } else {

      // Update Active Pair = Input Pair
      setPair(inputPair);

      // Reset error
      setErrorPair('');
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
          GO !
        </button>
      </form>
      <div style={{ color: "red" }}>{errorPair}</div>
    </>
  )

}

export default SearchBar;