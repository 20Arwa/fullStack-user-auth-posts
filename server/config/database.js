import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB Connected:", conn.connection.host)
  } catch (error) {
    console.log("DB ERROR:", error.message)
    process.exit(1)
  }
}

export default connectDB
