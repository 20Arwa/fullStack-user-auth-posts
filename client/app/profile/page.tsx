"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"
import { CircleUserRound, Mail } from "lucide-react"
import toast from "react-hot-toast"
import Post from "@/components/Post"
import PostForm from "@/components/PostForm"

type userInfoTypes = {
  user_id: string, 
  user_name: string,
  email: string
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<userInfoTypes | null>(null)
  const [posts, setPosts] = useState([])

  // Get User's Info
  useEffect(() => {
    const getUserInfo = async () => {

      try {
        const res = await api.get("users/me")
        setUserInfo(res.data.user)
      } catch(err: any) {
        toast.error(err.response?.data?.message)
      }

    }
    getUserInfo()
  }, [])
  
  // Get User's Posts
  useEffect(() => {
    if (!userInfo?.user_id) return
    fetchPosts()
  }, [userInfo?.user_id])
  
  const fetchPosts = async () => {
    try {
      const res = await api.get(`/posts/${userInfo?.user_id}`)      
      setPosts(res.data.posts)
    } catch(err: any) {
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <div className="container bg-white mx-auto flex flex-col items-center my-10 p-10 rounded-md">
      <div className="flex items-center">
        <CircleUserRound size={50}></CircleUserRound>
        <div className="ms-1">
          <h1 className="text-xl">{userInfo?.user_name}</h1>
          <div className="flex items-center gap-x-0.5">
            <Mail size={20}></Mail>
            <p>{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="posts w-full flex items-center justify-center my-20">
        {posts == undefined || posts?.length === 0 ? (
          <p className="text-2xl">No Posts</p>
        ) : (
          <div className="w-full grid grid-cols-3 gap-4">
            {posts?.map((post: any) => (
              <Post
              key={post._id}
              post={post}
              currentUserId={userInfo?.user_id}
              showButtons={true}
              onPostCreated={fetchPosts}
              />
            ))}
          </div>
          )}
      </div>
      <PostForm mode={"create"} onPostCreated={fetchPosts}></PostForm>
    </div>
  )
}
export default Profile