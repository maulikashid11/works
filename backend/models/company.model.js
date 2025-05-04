import mongoose from 'mongoose'

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Company = mongoose.model("company", companySchema)
export default Company