import {supabase } from "../../supabaseClient";
import { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';

const FAQboard = () => {
  const [ faqs, setFaqs ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ adding, setAdding ] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] =  useState({ question:'', answer:'' })

  // fetching FAQs
  async function getFaqs() {
    const { data, error } = await supabase.from('faqs').select('id, question, answer, created_at');

    if (error) {
      console.error(error);
    } else {
      setFaqs(data);
    }
    setLoading(false);
  }

  // Add an FAQ
  async function addFAQ(e) {

    e.preventDefault(); // stops the page from reloading
    setAdding(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to add an FAQ.');
      setAdding(false);
      return;
    }



    if (!question.trim() || !answer.trim()) {
      alert('Please fill out both fields. ');
      setAdding(false);
      return;
    }

    const { data, error } = await supabase
      .from('faqs')
      .insert([{question, answer, created_by: user.id, updated_by: user.id}])
      .select();
    
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

  // Delete an FAQ
  async function deleteFAQ(faqId){
    const { data, error } = await supabase.from('faqs').delete().eq('id', faqId)

    getFaqs() // reload Faqs

    if (error){
      console.log(error)
    }
  }

  async function saveEdit(faqId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to edit an FAQ.');
      setAdding(false);
      return;
    }

    const { error } = await supabase.from('faqs').update({ question: editValues.question, answer: editValues.answer, updated_by: user.id})
      .eq('id', faqId)
      .select();


    if (error) {
      console.error(error);
      alert('Problem updating FAQ');
    } else {
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === faqId
            ? { ...faq, question: editValues.question, answer: editValues.answer }
            : faq
        )
      )
      setEditingId(null); // Exit editing
    }
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
            <Button type="submit" disabled={adding}>
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
                <div key={faq.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                  {editingId === faq.id ? (
                    <>
                      <input
                        type="text"
                        value={editValues.question}
                        onChange={(e) =>
                          setEditValues({ ...editValues, question: e.target.value })
                        }
                        className="w-full border p-2 rounded mb-2"
                      />
                      <textarea
                        value={editValues.answer}
                        onChange={(e) =>
                          setEditValues({ ...editValues, answer: e.target.value })
                        }
                        className="w-full border p-2 rounded h-24 mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => saveEdit(faq.id)}>Save</Button>
                        <Button variant="secondary" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-semibold text-lg">{faq.question}</h4>
                      <p className="text-gray-700 mt-1">{faq.answer}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          onClick={() => {
                            setEditingId(faq.id);
                            setEditValues({ question: faq.question, answer: faq.answer });
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => deleteFAQ(faq.id)}>
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default FAQboard;