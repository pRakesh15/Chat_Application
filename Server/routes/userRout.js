import express from 'express';
import { allUser, createUser, loginUser } from '../controller/user.js';
// import { isAutharised } from '../middleware/isAuth.js';
import { authorization } from '../middleware/suthMiddelware.js';

export const router=express.Router();
router.post("/createUser",createUser)
.get("/",authorization,allUser)
.post("/loginUser",loginUser)
