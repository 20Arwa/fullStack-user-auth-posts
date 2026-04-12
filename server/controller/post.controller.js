import asyncHandler from "express-async-handler";
import {Post} from "../models/post.model.js"

// Get All Posts For All User
const getAllPosts =  asyncHandler(async(req,res) => {
        const posts = await Post.find().populate("user", "user_name")
        
        res.status(200).json({
            message: "Got All Posts",
            posts: posts
        })
})

// Get All Posts For A User
const getAllPostsForUser =  asyncHandler(async(req,res) => {
        const {id} = req.params
        const posts = await Post.find({user: id}).populate("user", "user_name")

        if (posts.length == 0) {
            res.status(200).json({
                message: "No Posts For This User"
            })
        }

        res.status(200).json({
            message: "Got All Posts For A User",
            posts: posts
        })
})

// Create
const createPost = asyncHandler(async(req,res) => {
        const {title, content} = req.body
        
        // Validation
        if (!title || !content) {
            const error = new Error("Can't Create Post Without Title Or Content")
            error.statusCode = 400
            throw error
        }
        
        const post = await Post.create({
            user: req.user.id,
            title: title,
            content: content
        })
        
        res.status(200).json({
            message: "Post Is Created",
            post: {title: post.title, content: post.content}
        })
})

// Update
const updatePost =  asyncHandler(async(req,res) => {
        const {title, content} = req.body

        if (!title && !content) {
            res.status(400)
            throw new Error("Nothing To Update")
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({
            message: "Post Is Updated",
            updated_post: post
        })
})

// Delete (Private)
const deletePost = asyncHandler(async(req,res) => {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404)
            throw new Error("Post Is Not Found")
        }

        res.status(200).json({
            message: "Post Is Deleted",
        })
})


const postLikes = asyncHandler(async(req, res) => {
    const {like} = req.body
    const userId = req.user.id
    let post

    if (like) {
        post = await Post.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likes: userId}},
            {new: true}
        )
    }
    else {
        post = await Post.findByIdAndUpdate(
            req.params.id,
            {$pull: {likes: userId}},
            {new: true}
        )
    }

    res.json({post})
})

export {getAllPosts,getAllPostsForUser,createPost, updatePost, deletePost, postLikes}