import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import connectToDB from './utils/db.js'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
const app = express()
dotenv.config()
connectToDB()

app.use(cors({
    origin: ["https://works-wheat-psi.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.get('/', (req, res) => {
    res.send("this is home page")
})

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})