'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setMessage('✅ Login successful!');
      console.log('Logged in user:', data);

    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-80 p-4 border rounded shadow"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
