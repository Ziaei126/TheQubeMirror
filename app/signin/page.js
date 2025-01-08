'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

function capitalizeWords(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  const callbackUrl = useSearchParams().get('callbackUrl');
  const providers = ['google', 'credentials']
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
        }),
      });
  
      // Check for HTTP errors
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error details from the server
        console.log(errorData)
        throw new Error(errorData?.details || 'An unexpected error occurred. Please try again.');
      }
  
      const { email } = await response.json();
  
      console.log('email: ', email);
      if (email) {
        signIn('email', {
          email: username,
          callbackUrl: callbackUrl || '/',
        });
      } else {
        signIn('credentials', {
          username,
          password,
          callbackUrl: callbackUrl || '/',
        });
      }
    } catch (error) {
      alert(`${error}`);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center  py-2">
  <h1 className="text-3xl font-bold mb-6">Sign In</h1>

  
<div className='max-w-sm mx-auto bg-slate-50 p-6 shadow-lg rounded-md'>
  <div className="w-full max-w-sm ">
    {providers.map((provider) => {
      if (provider === 'credentials') return null; // Skip the credentials provider in the provider buttons
      return (
        <div key={provider} className="mb-3 flex justify-center">
          <button
            onClick={() => signIn(provider, { callbackUrl: callbackUrl || '/' })}
            className="w-full flex items-center justify-center p-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100"
          >
            <img loading="lazy" height="24" width="24" id="provider-logo" src={`https://authjs.dev/img/providers/${provider}.svg`} />
            <span className='ml-4'>Continue with {capitalizeWords(provider)}</span>
            
          </button>
        </div>
      );
    })}
  </div>
  
  <div className="my-6 w-full max-w-sm flex items-center">
    <hr className="flex-grow border-gray-300" />
    <span className="mx-2 text-gray-500">OR</span>
    <hr className="flex-grow border-gray-300" />
  </div>
  <form onSubmit={handleSubmit} className="w-full max-w-sm">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your username"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="********"
      />
    </div>
    <div className="flex flex-col items-center justify-between">
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Sign In with credentials
      </button>
      <p className="mt-1 text-sm text-gray-600">
    Forgot Password?{' '}
    <Link href={`/forgot_password?callbackUrl=${encodeURIComponent(callbackUrl || '/')}`} className="text-blue-500 hover:text-blue-700 font-bold">
      reset here
    </Link>
  </p>
    </div>
  </form>
  <div className="my-6 w-full max-w-sm flex items-center">
    <hr className="flex-grow border-gray-300" />
    <span className="mx-2 text-gray-500">OR</span>
    <hr className="flex-grow border-gray-300" />
  </div>

  <p className="mt-4 text-sm text-gray-600">
    Don't have an account?{' '}
    <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl || '/')}`} className="text-blue-500 hover:text-blue-700 font-bold">
      Sign up here
    </Link>
  </p>

  </div>
</div>
  );
}

