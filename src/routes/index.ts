import { Router } from 'express';
const router = Router();
import { Router as ApiRouter } from 'express';
const apiRouter = ApiRouter();

// Define your API routes here

router.use('/api', apiRouter); // Create a basic router in the api/index.ts file

export default router;
