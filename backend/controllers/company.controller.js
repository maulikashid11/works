import Company from "../models/company.model.js"
import User from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';


export async function registerCompany(req, res) {
    const { name, website, location } = req.body
    const file = req.file.path
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user.role !== 'recruiter') {
            return res.status(404).json({ success: false, message: "something went wrong" })
        }
        const alreadyCompany = await Company.findOne({ name })
        if (alreadyCompany) {
            return res.status(404).json({ success: false, message: "company name already exists" })
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: "job-portal"
        })
        const company = await Company.create({
            name, website, location, companyLogo: cloudinaryResponse.secure_url, user: user._id
        })
        res.status(200).json({ success: true, message: "Company register sucessfully", company })
    } catch (error) {
        res.status(404).json({ success: false, message: "Something went wrong" })
    }
}

export async function getCompany(req, res) {
    try {
        const companies = await Company.find({ user: req.user.id })
        if (!companies) {
            return res.status(404).json({ success: false, message: "no companies found" })
        }
        res.status(200).json({ success: true, message: `${companies.length} companies found`, companies })
    } catch (error) {
        return res.status(404).json({ success: false, message: "another Something went wrong" })
    }
}