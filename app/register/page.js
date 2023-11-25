'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ParentDetailsForm from 'app/components/Registration/parentDetailsForm'



function Register() {
  const { data: session } = useSession();
  

  if (!session) {
    return (
      <>
        <h1>Registration</h1>
        <p>If you have not signed in, please <Link href="/signin">sign in</Link> first.</p>
      </>
    );
  }

  return (
    <div>
      <h1>Registration</h1>
      <ParentDetailsForm />
    </div>
  );
}

export default Register;
