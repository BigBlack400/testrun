"use client";

import React, { useState, useEffect } from "react";
import { updateContent, getContent, isAdmin, logout } from "../actions";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authorized = await isAdmin();
      if (!authorized) {
        router.push("/admin");
        return;
      }
      const data = await getContent();
      setContent(data);
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleUpdate = async (key: string, value: string) => {
    setSaving(key);
    try {
      await updateContent(key, value);
      setContent((prev) => ({ ...prev, [key]: value }));
    } catch (e) {
      alert("Failed to update content. Are you still logged in?");
      router.push("/admin");
    } finally {
      setSaving(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-instrument-sans">
        Loading...
      </div>
    );
  }

  const fields = [
    { key: "hero_pre_headline", label: "Hero Pre-headline", placeholder: "Design at the speed of thought" },
    { key: "hero_main_headline", label: "Hero Main Headline", placeholder: "Build Faster" },
    { key: "hero_sub_headline", label: "Hero Sub-headline", placeholder: "Create fully functional, SEO-optimized websites in seconds..." },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 font-instrument-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        <div className="space-y-8">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="block text-sm font-medium text-white/70">{field.label}</label>
              <div className="flex gap-4">
                <textarea
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  rows={2}
                  value={content[field.key] || ""}
                  onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
                <button
                  onClick={() => handleUpdate(field.key, content[field.key] || "")}
                  disabled={saving === field.key}
                  className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 h-fit self-end"
                >
                  {saving === field.key ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-white/60 text-sm">
            Changes made here will be reflected on the landing page immediately.
            Ensure you use high-quality copy to maintain the professional aesthetic of OHMNX.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
