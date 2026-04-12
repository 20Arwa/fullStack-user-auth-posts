import { CircleUserRound } from "lucide-react"
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "./ui/card"
import PostForm from "@/components/PostForm"
import DeletePost from "@/components/DeletePost"
import PostLikes from "./PostLikes"

type postTypes = {
    post: {_id: string, title: string, content: string, updatedAt: string, likes: [string], user : {_id: string, user_name: string}},
    currentUserId?: string
    showButtons: Boolean,
    onPostCreated?: any,
}
const Post = ({post, currentUserId, showButtons, onPostCreated}: postTypes) => {
    return (
        <Card className="p-0">
            <CardHeader className="border-b-2 py-2">
            {!showButtons && (
                <div className="flex items-center">
                    <CircleUserRound size={30}></CircleUserRound>
                    <p className="text-lg ms-1">{post.user?.user_name}</p>
                </div>
            )}
            {showButtons && (
                <CardAction>
                    <PostForm mode="edit" id={post._id} title={post.title} content={post.content} onPostCreated={onPostCreated}></PostForm>
                    <DeletePost id={post._id} onPostCreated={onPostCreated}></DeletePost>
                </CardAction>
            )}
            </CardHeader>
            <CardContent className="flex flex-col items-between justify-between h-full">
                <div>
                    <p className="text-xl mb-2">{post.title}</p>
                    <p>{post.content}</p>
                </div>
                <PostLikes postId={post._id} likes={post.likes} postUserId={post.user._id} currentUserId={currentUserId}></PostLikes>
            </CardContent>
            <CardFooter className="py-2">
                <p>{new Date(post.updatedAt.toString()).toLocaleString()}</p>
            </CardFooter>
        </Card>
    )
}

export default Post