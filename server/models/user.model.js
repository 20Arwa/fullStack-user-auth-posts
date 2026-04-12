import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        user_name: {
            type: String,
            required: [true, "Name is required"],
            lowercase: true, 
            trim: true, 
            minlenght: 2,
            maxlength: 30,
        }, 
        email: {
            type: String, 
            required: [true, "ُEmail is required"],
            lowercase: true, 
            unique: true, 
        }, 
        password: {
            type: String, 
            required: [true, "ُPassword is required"],
            minlenght: 8,
        }
    },
    {
        timestamps: true
    }
)

// Password Encryption
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    // next();
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)