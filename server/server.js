import dotenv from "dotenv"
dotenv.config()

import express from "express"
import errorHandler from "./middleware/errorHandler.js"
import connectDB from "./config/database.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import cors from "cors"

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/", postRouter)
app.use(errorHandler)

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

