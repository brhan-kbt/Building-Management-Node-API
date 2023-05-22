import express from 'express';
import { getUnits, createUnit, updateUnit, deleteUnit, getUnitById } from '../controllers/unit.js';

const router = express.Router();

router.get('/', getUnits);
router.post('/', createUnit);
router.put('/:id', updateUnit);
router.delete('/:id', deleteUnit);
router.get('/:id', getUnitById);

export default router;
