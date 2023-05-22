import express from 'express';
import { getFloors, createFloor, updateFloor, deleteFloor, getFloorById } from '../controllers/floor.js';

const router = express.Router();

router.get('/', getFloors);
router.post('/', createFloor);
router.put('/:id', updateFloor);
router.delete('/:id', deleteFloor);
router.get('/:id', getFloorById);

export default router;
