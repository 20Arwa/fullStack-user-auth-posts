"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api.js"
import { Button } from "@/components/ui/button"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useAuth()
    const router = useRouter()

    const handleRegister =  async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await api.post(
                "users/login",
                {email, password}
            )
            
            login(res.data.accessToken)

            // Success Msg Then Redirect To Home Page
            toast.success("Logged in successfully")
            setTimeout(() => {
                router.push("/")
            }, 1000)
            
        }
        catch(err: any) {
            toast.error(err.response?.data?.message || "something went wrong, please try again")
            if (err.response?.data?.type === "INVALID_PASSWORD") {
                setPassword("")
            }
        }

    }
    return (
        <div className="w-full max-w-96 mx-auto my-16"> 
            <form onSubmit={handleRegister} className="bg-white p-14 flex flex-col rounded-xl">
                <h1 className="text-2xl text-center mb-10">Login</h1>

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
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login