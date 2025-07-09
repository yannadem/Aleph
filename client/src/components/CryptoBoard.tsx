interface CryptoBoardProps {
  pair: string;
}

const CryptoBoard = ({ pair }: CryptoBoardProps) => {

  return (
    <>
      <h2>Crypto Board</h2>
      <p>Crypto: {pair}</p>
    </>
  )


}

export default CryptoBoard;