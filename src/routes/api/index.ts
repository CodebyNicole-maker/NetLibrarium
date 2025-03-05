import { Router } from 'express';
const router = Router();
import thoughtRoute from './thoughtRoute.js';
import userRoute from './userRoute.js';

router.use('/thought', thoughtRoute);
router.use('/user', userRoute);

export default router;