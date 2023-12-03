'use client'

import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link' 
import { usePathname, useSearchParams } from 'next/navigation'



function SignInButton() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: session } = useSession()

    // Check if the user is signed in
  const isSignedIn = session ? true : false;

  console.log(session)

  return (
    <div >
      {isSignedIn ? (
        // User is signed in
        <Link href={`/api/auth/signout?callbackUrl=${pathname}`} className="p-2 shadow rounded bg-slate-200 hover:shadow-none">{`signed in as ${session.user.name}`}</Link>
      ) : (
        // User is not signed in
        <Link href={`/api/auth/signin?callbackUrl=${pathname}`} className="p-2 shadow rounded bg-slate-200 hover:shadow-none">Sign In</Link>  // Change the URL to your actual sign-in page
      )}
    </div>
  )
}

export default SignInButton