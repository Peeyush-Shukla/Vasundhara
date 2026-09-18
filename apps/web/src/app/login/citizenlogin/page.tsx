'use client';
import Header from '../../../components/layout/header';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authService } from '../../../services/auth.service';

export default function LoginPage() {
  const router = useRouter();

  const [citizenCredentials, setCitizenCredentials] = useState({
    aadharId: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCitizenSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!/^\d{12}$/.test(citizenCredentials.aadharId)) {
      setError('Government ID number must be exactly 12 digits.');
      return;
    }

    try {
      setLoading(true);
      // Connect to NestJS
      const session = await authService.login({
        aadharId: citizenCredentials.aadharId,
        password: citizenCredentials.password,
      });

      console.log('Login successful:', session.user);

      // Citizen dashboard
      router.push('/dashboard/citizen');
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid ID number or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header/>
      
      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-bg-zoom {
          animation: slowZoom 25s ease-in-out infinite alternate;
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
      `}} />

      {/* Main Background Container */}
      <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
        
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 z-0 animate-bg-zoom bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/back.jpg')" }}
        />
        
        {/* Navy Blue Overlay Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#122C4A]/90 to-[#0B1F35]/70" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center animate-fade-up">

          {/* Citizen Login Card (Glassmorphism) */}
          <div className="w-full bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center">
            
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-[#122C4A] mb-2">
              Citizen Portal
            </h2>

            <p className="text-[#5B6472] mb-6 text-sm">
              Access land records, track acquisition status, and submit claims or grievances.
            </p>

            {/* Error Message */}
            {error && (
              <div className="w-full mb-4 px-4 py-3 rounded-md bg-red-50/90 border border-red-200 text-red-600 text-sm text-left flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={handleCitizenSubmit}
              className="w-full flex flex-col gap-5 text-left"
            >
              {/* ID Input */}
              <div>
                <label className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1.5">
                  12-Digit Government ID Number
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="Enter 12-digit number"
                  value={citizenCredentials.aadharId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setCitizenCredentials({
                      ...citizenCredentials,
                      aadharId: value,
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8C8] rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-sm text-[#1B2430] transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={citizenCredentials.password}
                  onChange={(e) =>
                    setCitizenCredentials({
                      ...citizenCredentials,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8C8] rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-sm text-[#1B2430] transition-colors"
                />
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs text-[#5B6472] mt-1">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#1B2430] transition-colors">
                  <input
                    type="checkbox"
                    className="rounded border-[#DDD8C8] text-[#10B981] focus:ring-[#10B981]"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="font-semibold text-[#10B981] hover:text-[#059669] hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-70 disabled:cursor-wait text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 mt-2 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Authenticating...
                  </>
                ) : (
                  'Citizen Login'
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="w-full pt-6 mt-6 border-t border-[#DDD8C8]/60 flex flex-col gap-4">
              <p className="text-xs text-[#5B6472]">
                New user?{' '}
                <Link href="/register" className="text-[#10B981] font-bold hover:underline">
                  Register here
                </Link>
              </p>
              
              <Link
                href="/login/mainlogin"
                className="text-[11px] font-bold text-gray-400 hover:text-[#122C4A] transition-colors flex items-center justify-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Portal Selection
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}