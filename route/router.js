import express from 'express'
const router = express.Router()
import { getAllData } from '../controll/userControll.js';

router.get("/", getAllData );


export default router