import express from 'express';

import { authorization } from '../middleware/suthMiddelware.js';
import { allMessage, sendMessage } from '../controller/messagecontroler.js';

export const router=express.Router();

router.post('/',authorization,sendMessage);
router.get("/:chatId",authorization,allMessage);