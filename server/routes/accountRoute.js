import { Router } from 'express';
import {
    getLoad,
    addLoad
} from '../controllers/accountController.js'

const router = Router();

router.route('/load/:accountId').get(getLoad);

router.route('/load').post(addLoad);

export default router;