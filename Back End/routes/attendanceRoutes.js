import express from 'express';
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', getRecords);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;
