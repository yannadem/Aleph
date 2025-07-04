import express from 'express';
import cryptoRoutes from './routes/cryptoRoutes'


const app = express();
const PORT = 3000;

app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`ALEPH listening on port ${PORT} 📈`)
})