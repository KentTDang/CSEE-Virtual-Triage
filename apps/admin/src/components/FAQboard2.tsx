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
  // 10/27 post class revert
  const [editing, setEditing] = useState(false);
  const [removing, setRemoving] = useState(false);

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
  // delete an FAQ
  async function delFAQ(faqId){
    const { data, error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', faqId)

    getFaqs()

    if (error){
      console.log(error)
    }
    
    if (data){
      console.log(data)
    } // why?
  }
  // // edit FAQ
  // async function editFAQ(q, a, faqId){
  //   const { data, error } = await supabase
  //     .from('faqs')
  //     .update(
  //       {question: q},
  //       {answer: a}
  //     )
  //     .eq('id', faqId)

  //   getFaqs()

  //   if (error){
  //     console.log(error)
  //   }
  // }
  // // should I do 2 functions 1 for question 1 for answer?

  useEffect(() => {
    getFaqs();
  }, []);


// 10/27 post class revert
//   return (
//     <div>
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold mb-4">FAQ Management Panel</h3>
//         {/* --- Add FAQ Form --- */}
//         <form onSubmit={addFAQ} className="mb-8 space-y-3">
//             <input
//             type="text"
//             placeholder="Question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full border p-2 rounded"
//             />
//             <textarea
//             placeholder="Answer"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             className="w-full border p-2 rounded h-24"
//             />
//             <Button type="submit" disabled = {adding} onClick={addFAQ}>
//                 {adding ? 'Adding...' : 'Add FAQ'}
//             </Button>
            
//         </form>
        
//         {loading ? (
//           <p>Loading FAQs...</p>
//         ) : faqs.length === 0 ? (
//           <p>No FAQs found.</p>
//         ) : (
//           <div className="space-y-4">
//             {faqs.map((faq) => (
//               <div>
//                 <div
//                   key={faq.id}
//                   className="border rounded-lg p-4 bg-gray-50 shadow-sm"
//                 >
//                   <h4 className="font-semibold text-lg">{faq.question}</h4>
//                   <p className="text-gray-700 mt-1">{faq.answer}</p>
//                 </div>
//                 {/* <Button onClick={()=>{editFAQ()}}>Edit</Button> */}
//                 <Button onClick={()=>{deleteFAQ(faq.id)}}>Delete</Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
//     </div>
//   )
// }

// export default FAQboard

// post class remove
return (
    <div className="mt-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-gray-900">
          FAQ Management Panel
        </h3>
        <p className="font-semibold text-gray-700 mt-1">
          Add, Edit, and Delete CSEE FAQs
        </p>
      </div>

      {/* Add FAQ Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h4 className="text-lg font-semibold mb-4 text-gray-900">
          Add a New FAQ
        </h4>
        <form onSubmit={addFAQ} className="space-y-3">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100 p-2.5 rounded-lg outline-none transition"
          />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100 p-2.5 rounded-lg h-24 outline-none transition"
          />
          <Button
            type="submit"
            disabled={adding}
            onClick={addFAQ}
            className="bg-black hover:bg-gray-600 text-[#FFC700] font-medium px-6 py-2 rounded-lg transition w-full sm:w-auto"
          >
            {adding ? "Adding..." : "Add FAQ"}
          </Button>
        </form>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h4 className="text-lg font-semibold mb-4 text-gray-900">
          Add a New FAQ
        </h4>
        <form onSubmit={addFAQ} className="space-y-3">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100 p-2.5 rounded-lg outline-none transition"
          />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100 p-2.5 rounded-lg h-24 outline-none transition"
          />
          <Button
            type="submit"
            disabled={adding}
            onClick={addFAQ}
            className="bg-black hover:bg-gray-600 text-[#FFC700] font-medium px-6 py-2 rounded-lg transition w-full sm:w-auto"
          >
            {adding ? "Editing..." : "Edit FAQ"}
          </Button>
        </form>
      </div>


      {/* <h2 className='font-semibold text-2xl'>Frequently Asked Questions</h2> */}

      {/* FAQs Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading FAQs...</p>
      ) : faqs.length === 0 ? (
        <p className="text-center text-gray-500">No FAQs found.</p>
      ) : (
        <div>        
          <p>Expand All/Collapse All</p>
          <p>Search</p>
          <p>Save Changes</p>
          <div className="border-t-2 border-gray-500 divide-y-2 divide-gray-500">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group py-4 cursor-pointer transition-all"
              >
                <summary className="flex justify-between items-center text-base sm:text-lg font-semibold text-gray-900 hover:text-[#FFC700] px-2 sm:px-4">
                  {faq.question}
                  <span className="text-gray-400 text-xl transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-2 sm:px-4 mt-2">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>

                  {/* Edit/Delete Buttons */}
                  <div className="flex gap-3 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={editing}
                      onClick={displayFAQ(faq.id)}
                    >
                      {editing ? "Editing..." : "Edit"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={removing}
                      onClick={()=>{delFAQ(faq.id)}}
                    >
                      {removing ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQboard;