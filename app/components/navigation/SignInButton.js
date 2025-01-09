'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from '@node_modules/next/link'

function SignInButton() {
  const { data: session } = useSession()
  const pathname = usePathname()

  // Check if the user is signed in and on the dashboard page
  const isDashboardPage = pathname === '/dashboard'

  return (
    <div>
      {session ? (
        !(session.isStaff) || isDashboardPage ? (
          // Show "Sign Out" button only on the dashboard page
          <button
            onClick={() => signOut()}
            className="p-2 shadow rounded bg-slate-200 hover:shadow-none"
          >
            Sign Out
          </button>
        ) : <Link
        href='/dashboard'
        className="p-2 shadow rounded bg-slate-200 hover:shadow-none"
      >
        Dashboard
      </Link> // No button outside the dashboard page
      ) : (
        // Show "Sign In" button if not signed in
        <button
          onClick={() => signIn()}
          className="p-2 shadow rounded bg-slate-200 hover:shadow-none"
        >
          Sign In
        </button>
      )}
    </div>
  )
}

export default SignInButton