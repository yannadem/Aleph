import { Router } from 'express';
import {getTicker, getOHLC} from '../controllers/cryptoController';

const router = Router();

// GET ticker
router.get('/ticker/:pair', getTicker);

// GET Ohlc
router.get('/OHLC/:pair', getOHLC);

export default router;