import { Router } from 'express';
import {
  createTicket,
  deleteTicket,
  getTickets,
} from '../controllers/ticketController.js';

const router = Router();

router.route('/:accountId').get(getTickets);
router.route('/:ticketId').delete(deleteTicket);
router.route('/').post(createTicket);

export default router;
