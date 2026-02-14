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
  userLogin,
  userSing,
  userSingPost,
  userLoginPost,
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

let chackAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/" , chackAuth , getAllData );
router.get("/show/:id",chackAuth, showAllData );
router.get("/add", addData );
router.post("/add",chackAuth, validationRegistation , addNewData );
router.get("/update/:id",chackAuth, updateData );
router.post("/update/:id", chackAuth,validationRegistation, updateNewData);
router.get("/delete/:id",chackAuth, deleteData);
router.get("/addimg",chackAuth, addingImg);
router.post('/addImg',chackAuth ,  upload.single("image"), addUser)
router.get("/login", userLogin); 
router.post("/login", chackAuth,userLoginPost); 
router.get("/singup", userSing);
router.post("/singup", userSingPost);
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


export default router