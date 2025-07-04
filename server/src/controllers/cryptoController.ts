import {Request,Response} from 'express';

const getCryptoData = (req: Request, res: Response) => {

  res.json({message: 'Incoming Crypto Data!'});

};

export default getCryptoData;