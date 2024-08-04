import "@styles/globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/Footer.js";
import AuthProvider from "./context/AuthProvider"; // Fixed the typo

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Qube",
  description: "Religious Sunday School for the 21st Century",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <main className="flex-grow bg-cream">{children}</main>
          </Suspense>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
