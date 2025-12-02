import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "@workspace/ui/components/button";

export default function HelpTicketSubmit() {
  const [form, setForm] = useState({
    sID: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    // Validation
    if (!form.sID || !form.email || !form.subject || !form.message) {
      setErrorMsg("All fields are required. Please fill out the entire form.");
      return;
    }

    // legal email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const confirmed = window.confirm(
        `Are you sure you want to submit this ticket?\n\nSubject: ${form.subject}\nMessage: ${form.message}`
    );
    if (!confirmed) {
        return; // stop submission if user cancels
    }


    const { error } = await supabase.from("help_tickets").insert({
      sID: form.sID,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    if (error) {
      setErrorMsg(`Submission failed: ${error.message}`);
    } else {
      setSuccess(true);
      setForm({ sID: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Submit a Help Ticket</h1>

      {success && (
        <p className="text-green-600 mb-4">
          Your ticket has been submitted. We'll contact you soon!
        </p>
      )}

      {errorMsg && (
        <p className="text-red-600 mb-4">
          {errorMsg}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="sID"
          placeholder="Student ID"
          value={form.sID}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="message"
          placeholder="Describe the issue..."
          value={form.message}
          onChange={handleChange}
          className="border p-2 rounded w-full h-32"
        />
        <Button className="hover:bg-[#FCB414]" type="submit">
          <span>Submit Ticket</span>
        </Button>
      </form>
    </div>
  );
}