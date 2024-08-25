import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const AuthenticationOptions = ({ commonData }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const handleManualSignup = () => {
    setShowPasswordInput(true);
  };

  const handleThirdPartyAuth = (provider) => {
    signIn(provider, { callbackUrl: '/auth/callback' });
  };

  const handleEmailSignup = async () => {
    // Assuming you have an API endpoint to handle signup
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: commonData.email,
        name: commonData.name,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle success (e.g., redirect to a different page)
    } else {
      // Handle error (e.g., display an error message)
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const googleButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#DB4437', // Google red color
  };

  const githubButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#333', // GitHub black color
  };

  const emailButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28A745', // Green color for email signup
  };

  const inputStyle = {
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <button style={googleButtonStyle} onClick={() => handleThirdPartyAuth('google')}>
        Sign Up with Google
      </button>
      <button style={githubButtonStyle} onClick={() => handleThirdPartyAuth('github')}>
        Sign Up with GitHub
      </button>
      <button style={emailButtonStyle} onClick={handleManualSignup}>
        Sign Up with Email
      </button>
      {showPasswordInput && (
        <>
          <input
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleEmailSignup}>
            Confirm Signup
          </button>
        </>
      )}
    </div>
  );
};

export default AuthenticationOptions;