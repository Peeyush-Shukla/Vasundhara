'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/layout/header';

export default function LoginPage() {
  return (
    <>
      <Header />
      
      {/* We use standard CSS in a style tag here so you don't have to edit tailwind.config.js */}
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
          animation: fadeUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}} />

      {/* Main Container - Accounts for Header height and fills the rest of the screen */}
      <main className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
        
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 z-0 animate-bg-zoom bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/back.jpg')" }}
        />
        
        {/* Navy Blue Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#122C4A]/90 to-[#0B1F35]/70" />

        {/* Content Wrapper (z-10 puts it above the background) */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          
          {/* Official Government Branding Header */}
          <div className="text-center mb-10 animate-fade-up">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F2A71B] mb-2 block drop-shadow-md">
              Single Sign-On Gateway
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">
              Secure Access Portal
            </h1>
            <p className="text-[#EAF0F7] mt-3 text-sm md:text-base max-w-lg mx-auto">
              Select your designated workspace to proceed into the National Land Acquisition & Management System.
            </p>
          </div>

          {/* Login Cards Container */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-center">
            
            {/* Citizen / Farmer Login Card */}
            <div className="flex-1 bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center animate-fade-up delay-100 hover:shadow-emerald-900/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#122C4A] mb-3">Citizen Portal</h2>
              <p className="text-[#5B6472] text-sm md:text-base mb-8 flex-grow">
                Track your land status, view compensation awards, and access Rehabilitation & Resettlement details directly.
              </p>
              
              <div className="w-full space-y-4 mt-auto">
                <Link href="/login/citizenlogin" className="w-full block">
                  <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                    Login with Aadhaar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </Link>
                <Link href="/register" className="block w-fit mx-auto">
                  <span className="text-xs md:text-sm font-semibold text-gray-500 hover:text-[#1D5FA8] transition-colors border-b border-transparent hover:border-[#1D5FA8]">
                    New User? Register Here
                  </span>
                </Link>
              </div>
            </div>

            {/* Official / Department Login Card */}
            <div className="flex-1 bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center animate-fade-up delay-200 hover:shadow-amber-900/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-amber-100">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#122C4A] mb-3">Official Workspace</h2>
              <p className="text-[#5B6472] text-sm md:text-base mb-8 flex-grow">
                Access Ministry dashboards, Collector action queues, agency pipelines, and MIS reports.
              </p>
              
              <div className="w-full space-y-4 mt-auto">
                <Link href="/login/departmentlogin" className="w-full block">
                  <button className="w-full bg-[#F2A71B] hover:bg-[#D97706] text-[#0B1F35] font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                    Department Login
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] md:text-xs font-semibold text-gray-400 mt-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Requires authorized NIC credentials
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}