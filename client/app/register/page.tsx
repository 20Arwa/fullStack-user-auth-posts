"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api.js"
import { Button } from "@/components/ui/button"


const Register = () => {
    const {register} = useAuth()
    const [user_name, setUser_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegister =  async (
        event:React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        // Validation (Password Contains At Least One Capital)
        const regCapitals = /[A-Z]/
        if (!password.match(regCapitals)) {
            toast.error("password must contain at leaset one uppercase letter")
            return
        }
        
        try {
            const res = await api.post(
                "users/register",
                {user_name, email, password}
            )
            register(res.data.accessToken)

            // Success Msg Then Redirect To Home Page
            toast.success("Account created successfully")
            setTimeout(() => {
                router.push("/")
            }, 1500)
            
        }
        catch(err: any) {
            toast.error(err.response?.data?.message || "something went wrong, please try again")
        }

    }
    return (
        <div className="w-full max-w-96 mx-auto my-16"> 
            <form onSubmit={handleRegister} className="bg-white p-14 flex flex-col rounded-xl">
                <h1 className="text-2xl text-center mb-10">Sign in</h1>
                <label htmlFor="user_name">User name</label>
                <input 
                    type="text" 
                    name="user_name" 
                    id="user_name" 
                    required 
                    minLength={2} 
                    maxLength={30} 
                    value={user_name}
                    onChange={(e) => setUser_name(e.target.value)}
                    placeholder="Enter your name"
                    className="border-2 border-gray-300 p-1 px-2 mb-5 rounded-sm "
                    />

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-300 p-1 px-2 mb-5 rounded-sm "
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    required
                    placeholder="Enter your password"
                    minLength={8} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 border-gray-300 p-1 px-2 mb-5 rounded-sm "
                />

                <Button className="bg-blue-600 text-white p-1 px-2 rounded-sm" type="submit">
                    Register
                </Button>
            </form>
        </div>
    )
}
export default Register