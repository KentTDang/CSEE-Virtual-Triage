// import React from 'react'
import { UserAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient';
// import { useState, useEffect } from 'react';
import { Button } from "@workspace/ui/components/button";

// admin user profiles (signout will be on this page/profile management{pass reset, etc})
// admin uuid's for adding/modifying FAQs
// FAQ modification backlog that tracks modifications?
// 

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async(e) => {
    e.preventDefault()
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleFAQ = () => {
    navigate('/FAQboard');
  }

  const handleChatbot = () => {
    navigate('/');
  }

  return (
    <div>
      <div className = "flex">
        <h1>Dashboard</h1>
        <h2>Welcome, {session?.user?.email}</h2>
          <p 
            onClick={handleSignOut}
            className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
          >
            Sign Out
          </p>
        </div>
      <div className= "m-3 gap-2">

        <Button onClick={handleFAQ}>FAQ Management</Button>

        <Button onClick={handleChatbot}>Chatbot</Button>
        
        <Button>FAQ Backlog</Button>

      </div>

    </div>
  )
}

export default Dashboard
