import {Router} from 'express';

const router = Router();

// GET
router.get('/', (req, res) => {
  res.json({message: 'Incoming Crypto Data!'});
});

export default router;