"use client"
import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Post from "@/components/Post";
import { useAuth } from "@/context/AuthContext";

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const {user} = useAuth() || null

    // Get All Posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/posts")
                setPosts(res.data.posts)
            }
            catch(err: any) {
                toast.error(err.response?.data?.message)
            }
        }
        fetchPosts()
    }, [])


    return (
    <div className="flex items-center justify-center my-20 mx-10">
        {posts.length === 0 ? (
            <p className="text-2xl mt-10">No Posts</p>
            ) : (
            <div className="w-full grid grid-cols-3 gap-4">
                {posts.map((post: any) => (
                <Post
                    key={post._id}
                    post={post}
                    currentUserId={user?.user?.id}
                    showButtons={false}
                />
                ))}
            </div>
            )}
    </div>
    )
}
export default AllPosts