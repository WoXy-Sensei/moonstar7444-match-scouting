import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import teams from './teams';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Moonstar7444',
  });
});

router.use('/teams', teams);

export default router;
