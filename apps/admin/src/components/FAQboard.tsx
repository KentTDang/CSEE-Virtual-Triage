// import React from 'react'
// import { UserAuth } from '../context/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';

const FAQboard = () => {
  const [ faqs, setFaqs ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  // adding FAQ states
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [adding, setAdding ] = useState(false);

  // fetching FAQs
  async function getFaqs() {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer, created_at');

    if (error) {
      console.error(error);
    } else {
      setFaqs(data);
    }
    setLoading(false);
  }

  // adding FAQ
  async function addFAQ(e) {
    e.preventDefault(); // stops the page from reloading
    setAdding(true);

    if (!question.trim() || !answer.trim()) {
        alert('Please fill out both fields. ');
        setAdding(false);
        return;
    }

    const { data, error } = await supabase
        .from('faqs')
        .insert([{question, answer}])
        .select(); // why do i need this line
    
    if (error) {
        console.error(error);
        alert('Problem adding FAQ')
    } else {
        // Add new FAQ to the top of the list without refetching
        setFaqs([data[0], ...faqs]);
        setQuestion('');
        setAnswer('');
    }
    setAdding(false)
  }

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">FAQ Management Panel</h3>
        {/* --- Add FAQ Form --- */}
        <form onSubmit={addFAQ} className="mb-8 space-y-3">
            <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border p-2 rounded"
            />
            <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded h-24"
            />
            <Button type="submit" disabled = {adding} onClick={addFAQ}>
                {adding ? 'Adding...' : 'Add FAQ'}
            </Button>
            
        </form>
        
        {loading ? (
          <p>Loading FAQs...</p>
        ) : faqs.length === 0 ? (
          <p>No FAQs found.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h4 className="font-semibold text-lg">{faq.question}</h4>
                <p className="text-gray-700 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default FAQboard
