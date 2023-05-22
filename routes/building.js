import express from 'express';
import { getBuildings, createBuilding, updateBuilding, deleteBuilding, getBuildingById } from '../controllers/Building.js';

const router = express.Router();

router.get('/', getBuildings);
router.post('/', createBuilding);
router.put('/:id', updateBuilding);
router.delete('/:id', deleteBuilding);
router.get('/:id', getBuildingById);

export default router;
