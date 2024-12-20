import { Router } from 'express';
const router = Router();
import {
  getALLThoughts,
  getThoughtsByid,
  createThoughts,
  updateThoughts,
  deleteThoughts
} from '../../controllers/ThoughtsController.js';

// /api/thoughts
router.route('/')
  .get(getALLThoughts)    
  .post(createThoughts);   


router
  .route('/:tId')
  .get(getThoughtsByid)    
  .put(updateThoughts)
  .delete(deleteThoughts)

   export default router


