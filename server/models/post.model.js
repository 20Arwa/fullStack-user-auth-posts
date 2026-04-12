import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        content: {
            type: String,
            maxlength: 1000,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema)