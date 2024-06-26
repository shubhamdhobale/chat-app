import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/user.routes.js'

dotenv.config({
  path:'./.env'
})

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoute)

//MongoDB connection
const connectDB = async () => {
try {
  await mongoose.connect(`${process.env.MONGO_URL}`)
  console.log("DB connected");
} catch (error) {
  console.log("Error in mongoDB connection" , error)
}  
}
connectDB();


app.listen(process.env.PORT , () => {
  console.log(`server is running on port ${process.env.PORT}`)
})