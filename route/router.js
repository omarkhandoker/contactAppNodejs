import express from 'express'
const router = express.Router()
import {
  getAllData,
  showAllData,
  addData,
  addNewData,
  updateData,
  updateNewData,
  deleteData,
  addUser,
  addingImg,
} from "../controll/userControll.js";
import { body } from 'express-validator'
import { upload } from '../middleware/upload.js';


const validationRegistation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is require")
    .isLength({ min: 3 })
    .withMessage("Minimum : 3 Charecter")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Only letter Are Allow"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("First Name is require")
    .isEmail()
    .withMessage("Only letter Are Allow"),
  ,
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be 10-15 digits")
    .isNumeric()
    .withMessage("Only numbers allowed"),

];

router.get("/", getAllData );
router.get("/show/:id", showAllData );
router.get("/add", addData );
router.post("/add", validationRegistation , addNewData );
router.get("/update/:id", updateData );
router.post("/update/:id",validationRegistation, updateNewData);
router.get("/delete/:id", deleteData);
router.get("/addimg", addingImg);
router.post('/addImg' ,upload.single("image"), addUser)


export default router