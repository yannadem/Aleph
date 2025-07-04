import { Router } from 'express';
import getCryptoData from '../controllers/cryptoController';

const router = Router();

// GET /crypto
router.get('/:pair', getCryptoData);

export default router;