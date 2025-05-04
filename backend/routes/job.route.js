import express from 'express'
import { loggedIn } from '../middlewares/loggedIn.js'
import { acceptApplication, createJob, deleteJob, getAllJobs, getJobs } from '../controllers/job.controller.js'
const router = express.Router()

router.post("/register", loggedIn, createJob)
router.get("/getalljobs", getAllJobs)
router.get("/getjobs", loggedIn, getJobs)
router.delete("/deletejob", loggedIn, deleteJob)
router.post("/accept", loggedIn, acceptApplication)

export default router