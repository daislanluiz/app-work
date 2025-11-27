import React, { useState } from 'react';
import { useStore } from '../store';
import { ViewState } from '../types';

interface AuthProps {
  view: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Auth: React.FC<AuthProps> = ({ view, onNavigate }) => {
  const { login, register } = useStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      onNavigate(ViewState.FEED);
    } else {
      setError('User not found. Try "sarah@design.com" or register.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !profession) {
      setError('All fields are required');
      return;
    }
    register(name, email, profession);
    onNavigate(ViewState.FEED);
  };

  const isLogin = view === ViewState.LOGIN;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">ServiceFlow</h1>
          <p className="text-slate-400">Connect with top professionals.</p>
        </div>

        <div className="bg-secondary p-8 rounded-2xl shadow-xl border border-slate-800">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Profession</label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    placeholder="e.g. Graphic Designer"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-400 text-sm mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                placeholder="name@example.com"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 mt-2"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setError('');
                onNavigate(isLogin ? ViewState.REGISTER : ViewState.LOGIN);
              }}
              className="text-primary hover:text-indigo-400 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
        
        {isLogin && (
          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg text-xs text-slate-500 text-center">
            <p className="font-bold mb-1">Demo Credentials:</p>
            <p>sarah@design.com</p>
            <p>david@photo.com</p>
          </div>
        )}
      </div>
    </div>
  );
};