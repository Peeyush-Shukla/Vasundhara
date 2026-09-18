'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/header'; // Assuming you want the header here too!
import { authService } from '../../../services/auth.service';

type AuthorityLevel =
  | ''
  | 'central'
  | 'state'
  | 'district'
  | 'field_officer'
  | 'admin';

const roleMap: Record<string, string> = {
  central: 'CENTRAL_OFFICER',
  state: 'STATE_OFFICER',
  district: 'DISTRICT_OFFICER',
  field_officer: 'FIELD_OFFICER',
  admin: 'ADMIN',
};

export default function DepartmentLoginPage() {
  const router = useRouter();

  const [authorityLevel, setAuthorityLevel] = useState<AuthorityLevel>('');
  const [aadharId, setAadharId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!authorityLevel) {
      setError('Please select your official authority tier.');
      return;
    }
    if (!/^\d{12}$/.test(aadharId)) {
      setError('Government ID must contain exactly 12 digits.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setLoading(true);

      // Login through common auth service
      const session = await authService.login({
        aadharId,
        password,
      });

      const user = session.user;
      if (!user) throw new Error('Invalid login response.');

      // Verify selected authority level
      const expectedRole = roleMap[authorityLevel];
      if (user.role !== expectedRole) {
        await authService.logout();
        throw new Error(`Selected authority tier does not match your RBAC credentials.`);
      }

      // Redirect based on actual role
      switch (user.role) {
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'CENTRAL_OFFICER':
          router.push('/dashboard/national');
          break;
        case 'STATE_OFFICER':
          router.push(`/dashboard/state/${user.stateId || 'MP'}`);
          break;
        case 'DISTRICT_OFFICER':
          router.push(`/dashboard/district/${user.districtId || 'JBP'}`);
          break;
        case 'FIELD_OFFICER':
          router.push('/dashboard/field');
          break;
        default:
          await authService.logout();
          throw new Error('This account is not authorized for the official workspace.');
      }
    } catch (err: any) {
      console.error('Authority login error:', err);
      setError(
        err?.message || 'Authentication failed. Please check your NIC credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      
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

          {/* Department Login Card (Glassmorphism) */}
          <div className="w-full bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center">
            
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 shadow-sm border border-amber-100">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-[#122C4A] mb-2">
              Official Workspace
            </h2>

            <p className="text-[#5B6472] mb-6 text-sm">
              Secure authentication for authorized government personnel and system administrators.
            </p>

            {/* Error Message */}
            {error && (
              <div className="w-full mb-4 px-4 py-3 rounded-md bg-red-50/90 border border-red-200 text-red-600 text-sm text-left flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col gap-4 text-left"
            >
              {/* Authority Level */}
              <div>
                <label htmlFor="authorityLevel" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1.5">
                  Authority Tier
                </label>
                <select
                  id="authorityLevel"
                  value={authorityLevel}
                  onChange={(e) => setAuthorityLevel(e.target.value as AuthorityLevel)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8C8] rounded-lg focus:outline-none focus:border-[#F2A71B] focus:ring-1 focus:ring-[#F2A71B] text-sm text-[#1B2430] disabled:bg-gray-100 font-medium transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select Authority Level</option>
                  <option value="central">Central Authority (DoLR / MoRD)</option>
                  <option value="state">State Authority (Macro-Oversight)</option>
                  <option value="district">District Authority (CALA)</option>
                  <option value="field_officer">Field Revenue Officer / Patwari</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              {/* ID Input */}
              <div>
                <label htmlFor="aadharId" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1.5">
                  12-Digit Government ID Number
                </label>
                <input
                  id="aadharId"
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  value={aadharId}
                  onChange={(e) => setAadharId(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 12-digit number"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8C8] rounded-lg focus:outline-none focus:border-[#F2A71B] focus:ring-1 focus:ring-[#F2A71B] text-sm text-[#1B2430] disabled:bg-gray-100 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8C8] rounded-lg focus:outline-none focus:border-[#F2A71B] focus:ring-1 focus:ring-[#F2A71B] text-sm text-[#1B2430] disabled:bg-gray-100 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F2A71B] hover:bg-[#D97706] disabled:opacity-70 disabled:cursor-wait text-[#0B1F35] font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 mt-4 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#0B1F35]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Authenticating...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="w-full pt-6 mt-6 border-t border-[#DDD8C8]/60 flex justify-center">
              <Link
                href="/login/mainlogin"
                className="text-[11px] font-bold text-gray-400 hover:text-[#122C4A] transition-colors flex items-center gap-1"
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