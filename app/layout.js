import "@styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "app/components/navigation/Navbar.js";
import Footer from "app/components/Footer.js";
import AuthProvider from "./context/AuthPorvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Qube",
  description: "Religious Sunday School for the 21st Century",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <AuthProvider>
      <Navbar />
        {children}
        <Footer/>
        </AuthProvider>
        </body>
    </html>
  );
}
