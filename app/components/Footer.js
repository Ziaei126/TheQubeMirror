import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <section className="bg-cream justify-center">
        <p className="text-center"> © 2022 The Qube All Rights Reserved </p>
        <Link href="/conditions" className=" underline"> Terms & Conditions</Link>
        <div className=" flex flex-row justify-center ">
            <Link href="https://www.instagram.com/wearetheqube">
                <img src="/assets/instagram.webp" alt="instagram" width={50} height={50} className="h-8 w-8"/>
            </Link>
            <Link href="https://wa.me/+447715477995">
                <img src="/assets/whatsapp.webp" alt="whatsapp" width={50} height={50} className="h-8 w-8"/>
            </Link>

        </div>


    </section>
  )
}

export default Footer