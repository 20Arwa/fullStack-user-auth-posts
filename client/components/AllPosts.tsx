"use client"
import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Post from "@/components/Post";
import { useAuth } from "@/context/AuthContext";

type userInfoTypes = {
    user_id: string, 
    user_name: string,
    email: string
}

const AllPosts = () => {
    const [userInfo, setUserInfo] = useState<userInfoTypes | null>(null)
    const [posts, setPosts] = useState([])
    const {token} = useAuth()

    // Get User's Info
    useEffect(() => {
        if (!token) {
            setUserInfo(null)
            return
        }
        const getUserInfo = async () => {
            try {
                const res = await api.get("users/me")
                setUserInfo(res.data.user)
            } catch(err: any) {
                toast.error(err.response?.data?.message)
            }
        }
        
        getUserInfo()
    }, [token])

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
    <div className="flex items-center justify-center my-20">
        {posts.length === 0 ? (
            <p className="text-2xl mt-10">No Posts</p>
            ) : (
            <div className="w-full grid grid-cols-3 gap-4">
                {posts.map((post: any) => (
                <Post
                    key={post._id}
                    post={post}
                    currentUserId={userInfo?.user_id}
                    showButtons={false}
                />
                ))}
            </div>
            )}
    </div>
    )
}
export default AllPosts