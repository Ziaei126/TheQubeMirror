'use client'

import { signIn, signOut ,useSession} from 'next-auth/react'



function SignInButton() {
    const { data: session } = useSession()

    // Check if the user is signed in
  const isSignedIn = session ? true : false;


  return (
    <div >
      {isSignedIn ? (
        // User is signed in
        
        <button onClick={() => signOut() } className="p-2 shadow rounded bg-slate-200 hover:shadow-none">{`Sign Out`}</button>
      ) : (
        // User is not signed in
        <button onClick={() => signIn() } className="p-2 shadow rounded bg-slate-200 hover:shadow-none">Sign In</button>  // Change the URL to your actual sign-in page
      )}
    </div>
  )
}

export default SignInButton