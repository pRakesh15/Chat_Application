import express from 'express';
// import { isAutharised } from '../middleware/isAuth.js';
import { accessChart, addtoGroup, createGroupChart, fetchChat, removeUserGc, renameGroup } from '../controller/chartControl.js';
import { authorization } from '../middleware/suthMiddelware.js';

export const router=express.Router();
router.post("/",authorization,accessChart)
.get("/",authorization,fetchChat)
.post("/group",authorization,createGroupChart);
router.put("/rename",authorization,renameGroup)
router.put("/addUser",authorization,addtoGroup)
router.put("/removeUser",authorization,removeUserGc)