"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserType = {
    user_name: string, 
    email: string,
    id: string
}

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserType | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            try {
                const payload = JSON.parse(atob(storedToken.split(".")[1]))
                const isExpired = payload.exp * 1000 < Date.now()

                if (isExpired) {
                    localStorage.removeItem("token")
                    setToken(null)
                    setUser(null)
                } else {
                    setToken(storedToken)
                    setUser(payload) 
                }

            } catch (error) {
                localStorage.removeItem("token")
                setToken(null)
                setUser(null)
            }
        }
    }, [])

    const register = (token: string) => {
        localStorage.setItem("token", token)
        const payload = JSON.parse(atob(token.split(".")[1]))
        setToken(token)
        setUser(payload)
    }

    const login = (token: string) => {
        localStorage.setItem("token", token)
        const payload = JSON.parse(atob(token.split(".")[1]))
        setToken(token)
        setUser(payload)
    }
    

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null) 
        router.replace("/")
    }

    return (
        <AuthContext.Provider value={{token, user, register, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)