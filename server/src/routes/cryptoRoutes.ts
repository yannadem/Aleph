import { Router } from 'express';
import getCryptoData from '../controllers/cryptoController';

const router = Router();

// GET /crypto
router.get('/', getCryptoData);

export default router;