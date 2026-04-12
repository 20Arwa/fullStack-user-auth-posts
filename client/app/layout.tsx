import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Toaster} from "react-hot-toast"
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Posts App",
  description: "A full-stack application that allows users to register, log in, CRUD posts, and interact with them through likes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-base`}
      >
        <AuthProvider>
          <Navbar></Navbar>
          {children}
          <Toaster toastOptions={{ style: { width: "500px", maxWidth: "500px" }}}></Toaster>
        </AuthProvider>
      </body>
    </html>
  );
}
