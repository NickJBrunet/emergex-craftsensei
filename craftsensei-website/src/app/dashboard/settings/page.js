'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/authContext';

export default function SettingsPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.displayName || user?.email?.split('@')[0] || '',
    email: user?.email || '',
    password: '',
    passwordConfirm: '',
  });

  const [passwordLastChanged, setPasswordLastChanged] = useState(() => {
    return new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  });

  const [saving, setSaving] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  
  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canChangePassword = () => {
    if (!passwordLastChanged) return true;
    const now = new Date();
    const diff = now.getTime() - passwordLastChanged.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days >= 30;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (form.password && !canChangePassword()) {
      setShowPassError(true);
      setTimeout(() => setShowPassError(false), 3000);
      return;
    }

    setSaving(true);
    setTimeout(() => {
      if (form.password) {
        setPasswordLastChanged(new Date());
      }
      setSaving(false);
      
      // Here you'd call your backend API later
      alert('Settings updated (demo only).');
    }, 500);
  };

  const handleDeleteAccount = async () => {
    if (deletePassword !== form.password && form.password) {
      alert('Password does not match. Account deletion cancelled.');
      return;
    }

    setDeleting(true);
    setTimeout(() => {
      // Here you'd call your backend DELETE /account API
      alert('Account deleted (demo only). Redirecting to home...');
      setDeleting(false);
      setShowDeleteModal(false);
      // In production: signOut(), router.push('/')
    }, 800);
  };

  const nextPasswordChangeDate = new Date(passwordLastChanged);
  nextPasswordChangeDate.setDate(nextPasswordChangeDate.getDate() + 30);

  return (
    <div className="space-y-10">
      <div>
        <p className="inline-flex rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Account settings
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Manage your profile
        </h1>
        <p className="mt-2 max-w-lg text-zinc-300">
          Update your display name, email, and password. Password can only be changed once per month.
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-semibold text-zinc-200">
                Display name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-zinc-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-500/20 pt-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Password</h2>

          {!canChangePassword() && (
            <div className="mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 p-4 text-sm text-amber-200">
              <p className="font-medium">
                You can change your password once every 30 days.
              </p>
              <p className="mt-1">
                Next allowed change: <strong>
                  {nextPasswordChangeDate.toLocaleDateString()}
                </strong>
              </p>
            </div>
          )}

          {showPassError && (
            <div className="mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 p-4 text-sm text-rose-200">
              You can only change your password once per month. Please try again later.
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-semibold text-zinc-200">
                New password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                disabled={!canChangePassword()}
                placeholder={canChangePassword() ? '•••••••••' : 'Locked for 30 days'}
                className={`w-full rounded-xl border bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 ${
                  canChangePassword()
                    ? 'border-emerald-500/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40'
                    : 'border-zinc-600/50 bg-zinc-900 text-zinc-500'
                }`}
              />
            </div>

            {form.password && (
              <div>
                <label className="block mb-2 text-sm font-semibold text-zinc-200">
                  Confirm password
                </label>
                <input
                  name="passwordConfirm"
                  type="password"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Password must be at least 8 characters long and changed no more than once per 30 days.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="hover:cursor-pointer rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 hover:scale-102 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>

          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, password: '', passwordConfirm: '' }))}
            className="hover:cursor-pointer rounded-xl border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 transition-all"
          >
            Clear password
          </button>
        </div>
      </form>

      {/* Delete Account Section */}
      <div className="rounded-3xl border border-rose-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
          Delete Account
        </h2>
        
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 mb-6">
          <p className="text-sm text-rose-200">
            This action is <strong>permanent</strong> and will delete all your servers, API keys, 
            chat logs, and account data permanently.
          </p>
          <p className="text-xs text-rose-300 mt-1">
            No data recovery possible. Please export any important data first.
          </p>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="rounded-xl border-2 border-rose-500/50 bg-rose-900/30 px-6 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-800/40 hover:scale-[1.02] hover:border-rose-400/70 active:scale-95 transition-all"
        >
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 border border-rose-500/50 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-500/20 border-2 border-rose-500/40 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Delete Account</h3>
                <p className="text-zinc-400">This cannot be undone.</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-zinc-300">
                Type your current password to confirm account deletion:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-rose-500/40 bg-black/70 px-4 py-3 text-zinc-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/40"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-rose-500/20">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || deletePassword.length < 6}
                className="flex-1 rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {deleting ? 'Deleting...' : 'Delete Account'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                }}
                disabled={deleting}
                className="px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/10 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}