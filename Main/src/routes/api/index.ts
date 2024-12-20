import { Router } from 'express';
import userRoutes from './usersRoutes';
import thoughtRoutes from './thoughtRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;