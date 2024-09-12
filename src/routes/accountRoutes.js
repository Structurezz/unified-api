
import express from 'express';
import accountController from '../app/controllers/accountController.js';

const router = express.Router();

router.post('/', accountController.createAccount);

router.get('/', accountController.getAllAccounts);


router.get('/:accountId', accountController.getAccountById);

router.put('/:accountId', accountController.updateAccount);

router.delete('/:accountId', accountController.deleteAccount);

export default router;
