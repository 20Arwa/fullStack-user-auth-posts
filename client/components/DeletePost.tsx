"use cleint"
import { useState } from "react"
import api from "@/lib/api"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {Trash} from "lucide-react"
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

type DeletePostTypes = {
    id: string | null,
    onPostCreated: any,
}

const DeletePost = (props: DeletePostTypes) => {
    const [open, setOpen] = useState(false)

    const handleDeletePost = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await api.delete(
                `posts/${props.id}`,
            )
            toast.success("Post Is Deleted")
            setOpen(false)
            props.onPostCreated()
        
        } catch(err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white cursor-pointer "><Trash></Trash></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleDeletePost}>
                <DialogHeader>
                    <DialogTitle className="text-lg border-b-2">Delete</DialogTitle>
                    <DialogDescription className="py-5 text-black text-base">
                        Are you sure you want to delete this post?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Delete</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    )
}
export default DeletePost









