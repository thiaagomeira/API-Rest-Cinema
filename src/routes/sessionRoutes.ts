import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createSession,
  updateSession,
  deleteSession,
} from 'src/api/controllers/sessionController';
import { sessionSchema } from './schemas/sessionSchema';

const router = Router();

router.post(
  '/movies/:movie_id/sessions',
  celebrate(sessionSchema),
  createSession,
);
router.put(
  '/movies/:movie_id/sessions/:id',
  celebrate(sessionSchema),
  updateSession,
);
router.delete('/movies/:movie_id/sessions/:id', deleteSession);

export default router;
