import { Router } from 'express';
const router = Router();
import thoughtRoute from './thoughtRoute.js';
import userRoute from './userRoute.js';

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

export default router;