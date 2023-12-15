import { Router } from 'express';
import {
  getUser,
  getUsers,
  login,
  register,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.route('/').get(getUsers);
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/:userId').get(getUser);
router.route('/:userId').put(updateUser);

export default router;
