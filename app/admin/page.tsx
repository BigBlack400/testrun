"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(password);
      if (result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-instrument-sans p-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">OHMNX Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-white/40 text-xs">
          Protected area for OHMNX administrators only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
