"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { CircleUserRound, Mail } from "lucide-react"
import toast from "react-hot-toast"
import Post from "@/components/Post"
import PostForm from "@/components/PostForm"
import { useRouter } from "next/navigation"

const Profile = () => {
  const [posts, setPosts] = useState([])
  const { user } = useAuth()
  const router = useRouter()

  if (user === undefined) {
    return <p>Loading...</p>
  }

  if (user === null) {
    router.push("/login")
    return null
  }

  // Get User's Posts
  useEffect(() => {
    if (!user?.user?.id) return
    fetchPosts()
  }, [user])
  
  
  const fetchPosts = async () => {
    try {
      const res = await api.get(`/posts/${user.user.id}`)      
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
          <h1 className="text-xl">{user?.user?.user_name}</h1>
          <div className="flex items-center gap-x-0.5">
            <Mail size={20}></Mail>
            <p>{user?.user?.email}</p>
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
              currentUserId={user?.user?.id}
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