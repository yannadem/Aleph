import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cryptoRoutes from './routes/cryptoRoutes';

// access .env
dotenv.config();

// start server
const app = express();

// Cross origin resource sharing
app.use(cors());

const PORT = process.env.PORT || 3000;



app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`ALEPH listening on port ${PORT} 💥📈`)
})