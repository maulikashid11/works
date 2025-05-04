import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
    },
    experience: {
        type: Number
    },
    requirement: {
        type: Number
    },
    applications: [
        {   
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            status:String
        }
    ],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    }
}, { timestamps: true })

const Job = mongoose.model("job", jobSchema)
export default Job