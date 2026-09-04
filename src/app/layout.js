import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbarpage from "./Components/Navbar";
import Footerpage from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub - Discover & Share Delicious Recipes",
  description: "Join RecipeHub to explore, create, and share amazing culinary recipes with food enthusiasts around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100 selection:bg-emerald-500 selection:text-black">
        <Navbarpage />
        <main className="flex-1 bg-black"> 
          {children}
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#18181b',
                color: '#f4f4f5',
                border: '1px solid #27272a',
              },
            }} 
          />
        </main>
        <Footerpage />
      </body>
    </html>
  );
}
