import Company from "../models/company.model.js"
import Job from "../models/job.model.js"

export async function createJob(req, res) {
    const { title, description, salary, experience, requirement, companyId } = req.body
    try {
        const company = await Company.findOne({ _id: companyId, user: req.user.id })
        if (!company) {
            return res.status(404).json({ success: false, message: "Companies not found" })
        }
        const alreadyJob = await Job.findOne({ title: title, company: company._id })
        if (alreadyJob) {
            return res.status(404).json({ success: false, message: "Already have job with same profession" })
        }
        const job = await Job.create({
            title, description, salary, experience, requirement, company: company._id
        })
        res.status(201).json({ success: true, message: "Job created successfully", job })
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message })

    }
}

export async function getAllJobs(req, res) {
    try {
        const jobs = await Job.find({}).populate({
            path: "applications.user",
        }).populate({
            path: "company"
        })
        if (!jobs) {
            return res.status(404).json({ success: false, message: "Jobs not found" })
        }
        res.status(200).json({ success: true, message: "Job fetched successfully", jobs })
    } catch (error) {
        res.status(404).json({ success: false, messa: error.message })
    }
}

export async function getJobs(req, res) {
    const companyId = req.query.companyId
    try {
        const jobs = await Job.find({ company: companyId }).populate({
            path: "applications.user"
        }).populate({
            path: "company"
        })
        if (!jobs) {
            return res.status(404).json({ success: false, message: "Jobs not found" })
        }
        res.status(200).json({ success: true, message: "Job fetched successfully", jobs })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

export async function deleteJob(req, res) {
    const { jobId } = req.body
    try {
        const job = await Job.findOneAndDelete({ _id: jobId })
        res.status(200).json({ success: true, message: "Job deleted successfully" })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

export async function acceptApplication(req, res) {
    const { jobId, userId } = req.body
    try {

        const job = await Job.findOne({ _id: jobId })
        const index = job.applications.findIndex(el => el.user.toString() === userId.toString())
        if (!job ) {
            return res.status(404).json({ success: false, message: "something went wrong" })
        }
        job.applications[index].status = "accepted"
        await job.save()
        res.status(200).json({ success: true, message: "Job applied successfully" })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}