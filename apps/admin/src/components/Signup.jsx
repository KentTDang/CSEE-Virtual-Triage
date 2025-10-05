import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";



const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const { session, signUpNewUser } = UserAuth();
  const navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signUpNewUser(email, password)

      if (result.success) {
        navigate('/dashboard')
      }
    } catch (err) {
      setError("an error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-muted h-screen'>
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-6 lg:justify-start'>
          {/* Logo */}
          <a href="https://www.shadcnblocks.com">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
              alt="logo"
              title="shadcnblocks.com"
              className="h-10 dark:invert"
            />
          </a>

          <form onSubmit={handleSignUp} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            <h1 className="text-xl font-semibold">Sign up today!</h1>
            
            <div className="text-muted-foreground flex justify-center gap-1 text-sm">
              <p>
                Aleady have an account? <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </div>
            {/* <div className="flex flex-col py-4"> */}
                <Input 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                className="p-3 mt-6" 
                type="email" 
                />
                <Input 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="p-3 mt-6" 
                type="password" 
                />
                <Button type="submit" disabled={loading} className="w-full mt-3">
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
                {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            {/* </div> */}
          </form>


        </div>
      </div>
    </div>
  );
};

export default Signup;
