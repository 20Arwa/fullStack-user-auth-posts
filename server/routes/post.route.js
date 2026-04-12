import { Router } from "express"
import {getAllPosts, getAllPostsForUser ,createPost, updatePost, deletePost, postLikes} from "../controller/post.controller.js"
import validateToken from "../middleware/validateToken.js"

const postRouter = Router()

postRouter.route('/posts').get(getAllPosts)
postRouter.route('/posts/:id').get(getAllPostsForUser)

postRouter.route('/posts').post(validateToken,createPost)
postRouter.route('/posts/:id').patch(validateToken,updatePost)
postRouter.route('/posts/:id/like').patch(validateToken,postLikes)
postRouter.route('/posts/:id').delete(validateToken,deletePost)

export default postRouter