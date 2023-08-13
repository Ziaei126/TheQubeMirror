import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <section className="flex flex-col bg-cream justify-center">
        <p className="text-center"> © 2022 The Qube All Rights Reserved </p>
        <Link href="/conditions" className="text-center underline"> Terms & Conditions</Link>
        <div className="w-full bg-pastel-blue sm:bg-transparent flex flex-row justify-center fixed bottom-0 left-1/2 transform -translate-x-1/2 sm:relative">
            <Link href="https://www.instagram.com/wearetheqube" className="w-1/2 sm:w-auto">
                <img src="/assets/instagram.webp" alt="instagram" width={50} height={50} className="w-full sm:w-8"/>
            </Link>
            <Link href="https://wa.me/+447715477995" className="w-1/2 sm:w-auto">
                <img src="/assets/whatsapp.webp" alt="whatsapp" width={50} height={50} className="w-full sm:w-8"/>
            </Link>

        </div>


    </section>
  )
}

export default Footer