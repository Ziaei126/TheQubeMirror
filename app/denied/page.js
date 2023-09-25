import React from 'react'
import Link from 'next/link'

export default function Denied() {
  return (
    <section>
        <h1>Access Denied</h1>
        <p>you are logged in, but you do not have the required access level to view this page</p>
        <Link href="/">Return Home</Link>
    </section>
  )
}
