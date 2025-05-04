import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    resume: {
        type: String
    },
    skills: [
        {
            type: String,
        }
    ],
    experience: {
        type: Number
    },
    bio: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "recruiter"],
        default: "user"
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
export default User