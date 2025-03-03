import { Router } from 'express';
const router = Router();
// import { Router as ApiRouter } from 'express';
import apiRouter from "./apis/index.js";

// Define your API routes here

router.use('/api', apiRouter); // Create a basic router in the api/index.ts file

export default router;
