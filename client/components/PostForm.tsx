"use cleint"

import { useState } from "react"
import api from "@/lib/api"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {Pencil} from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type postFormTypes = {
    mode: string,
    onPostCreated: any,
    id?: string,
    title?: string,
    content?: string
}

const PostForm = (props: postFormTypes) => {
    const [title, setTitle] = useState(props.title || "")
    const [content, setContent] = useState(props.content || "")
    const [open, setOpen] = useState(false)

    const handleFormPost = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (props.mode === "create") {
                const res = await api.post(
                    "posts/", 
                    {title,content}
                )
                props.onPostCreated()
                setOpen(false)
                setTitle("")
                setContent("")
                toast.success("Post Is Created")
            }
            else {
                if (title == props.title && content == props.content ) {
                    toast.error("No changes were made")
                }
                else {
                    const res = await api.patch(
                        `posts/${props.id}`,
                        {title,content}
                    )
                    props.onPostCreated()
                    setOpen(false)
                    toast.success("Post Is Updated")
                }
            }
        } catch(err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white cursor-pointer ">{props.mode === "create" ? "Create New Post" : <Pencil></Pencil>}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleFormPost}>
                <DialogHeader>
                    <DialogTitle className="text-lg">
                        {props.mode === "create" ? "Create new post" : "Edit Post"}
                    </DialogTitle>
                    <DialogDescription>
                        {props.mode === "create" ? "What do you wnat to talk about?" : "Update your post details."}
                    </DialogDescription>
                </DialogHeader>
                    <div className="form my-2">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input 
                            required
                            type="text" 
                            name="title" 
                            id="title" 
                            placeholder="Enter Post Title"
                            maxLength={100}
                            className="block w-full border-2 border-gray-300 p-1 px-2 mb-5 rounded-sm "
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <textarea 
                            required
                            name="content" 
                            id="content" 
                            placeholder="Enter post Content"
                            maxLength={1000}
                            className="w-full border-2 border-gray-300 p-1 px-2 mb-5 rounded-sm"
                            value={content}
                            onChange={(e) => {setContent(e.target.value)}}
                            ></textarea>
                        </div>
                    </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{props.mode === "create" ? "Create" : "Update"}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    )
}
export default PostForm