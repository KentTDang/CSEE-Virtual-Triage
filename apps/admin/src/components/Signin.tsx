import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.jsx';

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";



const Signin = () => {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [error, setError] = useState<String>('');
  const [loading, setLoading] = useState<boolean>();

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate()


  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signInUser(email, password)

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
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* Logo */}
          <a href="https://www.shadcnblocks.com">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
              alt="logo"
              title="shadcnblocks.com"
              className="h-10 dark:invert"
            />
          </a>

          <form onSubmit={handleSignIn} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            <h1 className="text-xl font-semibold">Login</h1>
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
            <Button type="submit" className="w-full mt-3" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Need an account?</p>
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
