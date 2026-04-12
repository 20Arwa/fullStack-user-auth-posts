"use client"
import {Button} from './ui/button'
import {User} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'


const Navbar = () => {
    const {token, logout} = useAuth()
    const router = useRouter()
    
    // Log Out
    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully")
        setTimeout(() => {
            router.push("/")
        }, 1000)
    }

    return (
        <nav className='bg-blue-600 flex justify-between p-5 text-white'>
        <Link href={"/"} className='text-2xl text-bold'>Posts</Link>
        {!token ? (
            <div>
                <Link href="/register">
                    <Button className="bg-transparent border-2 border-white mx-1">
                        Register
                    </Button>
                </Link>
                <Link href="/login">
                    <Button className="bg-transparent border-2 border-white mx-1">
                        Log in
                    </Button>
                </Link>
            </div>
        ) : (
            <div className='flex items-center'>
                <Link href={"/profile"}>
                    <User className="bg-transparent w-auto h-auto mx-1 border-2 border-white rounded-full p-0.5 text-sm cursor-pointer" />
                </Link>

                <Button
                    className="bg-transparent border-2 border-white mx-1"
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            </div>
        )}
        </nav>
    )
}
export default Navbar