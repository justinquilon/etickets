import { Router } from 'express';
import {
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  filterByName,
  filterByDate,
  filterByDateRange
} from '../controllers/eventController.js';

const router = Router();

router.route('/').get(getEvent);
router.route('/').post(addEvent);
router.route('/:eventId').get(getEventDetails);

router.route('/:eventId').delete(deleteEvent);

router.route('/:eventId').put(updateEvent);
router.route('/find/name/:name').get(filterByName);
router.route('/find/date/:date').get(filterByDate);
router.route('/find/date-range/:dateStart/:dateEnd').get(filterByDateRange);

export default router;
