"use cleint"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import api from "@/lib/api"
import toast from "react-hot-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type PostLikesTypes = {
    postId: string,
    likes: [string],
    currentUserId?: string,
    postUserId: string
}

const PostLikes = (props: PostLikesTypes) => {
        const {token} = useAuth()
        const [open, setOpen] = useState(false)
        const [liked, setLiked] = useState(false)
        const [numLikes, setnumLikes] = useState<number>(props.likes.length)

        // Check If Post Alredy Liked
        useEffect(() => {props.likes.includes(props.currentUserId || "") ? setLiked(true) : setLiked(false)}, [props.currentUserId, props.likes])
        // Handle Like
        const handleLike = async() => {
            if (!token) {
                setOpen(true)
            }
            else {
                try {
                    const res = await api.patch(
                        `posts/${props.postId}/like`,
                        {userId: props.currentUserId, like: !liked}
                    )
                    setnumLikes(prev => liked ? prev - 1 : prev + 1)
                    setLiked(!liked)
                } catch(err: any ) {
                    toast.error(err.response?.data?.message)
                }            
            }
        }
    return (
        <div className="flex justify-end items-center mt-2">
            <p className="text-base me-1">{numLikes}</p>
            <Button 
                variant="ghost" 
                className="disabled:opacity-90 text-black bg-transparent p-0 cursor-pointer hover:bg-transparent [&_svg]:!w-7 [&_svg]:!h-7" 
                disabled={props.postUserId === props.currentUserId}
                onClick={handleLike}
            >
                <Heart
                    className={`transition-all duration-200 ${
                        liked
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-black"
                    }`}
                    />
            </Button>
            {/* If User Not Logged In */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle className="text-lg border-b-2">Login to continue</DialogTitle>
                            <DialogDescription className="py-2 text-black text-base">
                                Please log in or register to continue interacting with posts
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="py-3">
                            <Button><Link href={"/register"}>Register</Link></Button>
                            <Button><Link href={"/login"}>Log in</Link></Button>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default PostLikes