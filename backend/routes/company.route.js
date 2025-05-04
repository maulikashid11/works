import express from 'express'
import { loggedIn } from '../middlewares/loggedIn.js'
import { getCompany, registerCompany } from '../controllers/company.controller.js'
import { upload } from '../utils/multer.js'
const router = express.Router()

router.post("/register", upload.single('file'), loggedIn, registerCompany)
router.get("/get", loggedIn, getCompany)

export default router