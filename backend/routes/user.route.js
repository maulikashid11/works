import express from 'express'
import { applyToJob, getUser, login, register, updateProfile } from '../controllers/user.controller.js'
import { loggedIn } from '../middlewares/loggedIn.js'
import { upload } from '../utils/multer.js'
const router = express.Router()

router.post('/signup', upload.single('file'), register)
router.post('/login', login)
router.post('/update', upload.single('file'), loggedIn, updateProfile)
router.post('/applytojob', loggedIn, applyToJob)
router.get('/getuser', loggedIn, getUser)
export default router