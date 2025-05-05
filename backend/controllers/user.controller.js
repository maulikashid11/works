import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import Job from '../models/job.model.js'
import { v2 as cloudinary } from 'cloudinary';

export async function getUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.user.id })
        if (!user) {
            res.status(404).json({ success: false, message: "Something went wrong" })
        }
        res.status(200).json({ success: true, message: "User fetched successfully", user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function register(req, res) {
    let { fullname, email, password, role } = req.body
    const file = req.file.path
    try {
        const alreadyUser = await User.findOne({ email })
        if (alreadyUser) {
            return res.status(500).json({ success: false, message: "User already exists" })
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const cloudinaryResponse = await cloudinary.uploader.upload(file, {
                    folder: "job-portal"
                })
                const user = await User.create({
                    fullname,
                    email,
                    password: hash,
                    role,
                    profilePic: cloudinaryResponse.secure_url
                })

                let token = jwt.sign({ email: user.email, id: user._id }, 'secret')
                res.status(200).json({ success: true, message: "User Created Successfully", token })
            })
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export async function login(req, res) {
    let { email, password, role } = req.body
    try {
        let user = await User.findOne({ email, role })
        if (!user) {
            return res.status(500).json({ success: false, message: "Something went wrong!" })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: user.email, id: user._id }, 'secret')
                res.status(200).json({ success: true, message: "User Logged In successfully", token })
            } else {
                res.status(500).json({ success: false, message: "Something went wrong!" })
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export async function updateProfile(req, res) {
    const { fullname, email, bio, skills, experience } = req.body
    const file = req.file.path

    try {
        const skillsArray = skills.split(',')
        const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: "job-portal",
            resource_type: "raw"
        })
        const user = await User.findOneAndUpdate({ email: req.user.email }, {
            fullname, email, bio, skills: skillsArray, experience, bio,
            resume: cloudinaryResponse.secure_url
        }, { new: true })
        res.status(200).json({ success: true, message: "User updated successfully",user })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

export async function applyToJob(req, res) {
    const { jobId } = req.body
    try {
        const job = await Job.findOne({ _id: jobId })
        if (!job && job.applications.some(ap=>ap.user==req.user.id)) {
            return res.status(404).json({ success: false, message: "Job not found" })
        }
        job.applications.push({ user: req.user.id, status: 'pending' })
        await job.save()
        res.status(200).json({ success: true, message: "User applied successfully", job })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

