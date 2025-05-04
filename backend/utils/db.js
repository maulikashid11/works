import mongoose from 'mongoose'

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connect to database')
}

export default connectToDB
