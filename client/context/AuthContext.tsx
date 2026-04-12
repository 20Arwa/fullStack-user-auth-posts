"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
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
                } else {
                    setToken(storedToken)
                }

            } catch (error) {
                localStorage.removeItem("token")
                setToken(null)
            }
        }
    }, [])

    const register = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }

    const login = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }
    

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        router.replace("/")
    }

    return (
        <AuthContext.Provider value={{token, register, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)