import dotenv from 'dotenv';
import express from 'express';
import cryptoRoutes from './routes/cryptoRoutes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`ALEPH listening on port ${PORT} 📈`)
})