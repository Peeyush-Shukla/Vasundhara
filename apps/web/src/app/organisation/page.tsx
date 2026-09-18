'use client';
import React, { useState } from 'react';
import Header from '../../components/layout/header';
import Link from 'next/link';

// Mock Data for Ongoing Projects
const ONGOING_PROJECTS = [
  {
    id: 'NHAI-MP-04',
    name: 'Indore-Khandwa Highway 4-Laning (NH-44)',
    purpose: 'Infrastructure - Highway',
    targetArea: '125.5 Ha',
    stage: 'Section 19 (Final Declaration)',
    progress: 75,
    budget: '₹ 850 Cr',
    disbursed: '₹ 200 Cr'
  },
  {
    id: 'RAIL-WCR-88',
    name: 'Bhopal-Itarsi 3rd Railway Line Expansion',
    purpose: 'Infrastructure - Railways',
    targetArea: '85.2 Ha',
    stage: 'Section 11 (Preliminary Notif.)',
    progress: 25,
    budget: '₹ 420 Cr',
    disbursed: '₹ 0 Cr'
  }
];

export default function AgencyDashboard() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  return (
    <>
      <Header />
      
      {/* Navigation */}
      <nav className="bg-[#122C4A] flex flex-wrap items-center px-8 py-2 md:py-0 shadow-sm relative z-10">
        <ul className="flex flex-wrap flex-1 list-none m-0 p-0">
          {[
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/#about-us' },
            { name: 'Notification', href: '/notifications' },
            { name: 'Act', href: 'https://mwcc.org.in/knowledge%20center/LandAcqisition/landAcquisitionAct-2013-.pdf', newTab: true },
            { name: 'Projects', href: '/#projects' },
            { name: 'Important Links', href: '/#important-links' }
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                target={item.newTab ? "_blank" : "_self"}
                className="block px-[18px] py-[14px] text-[#EAF0F7] text-[13px] font-semibold tracking-[0.02em] hover:bg-[#0B1F35] transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Agency Workspace */}
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1B2430]">
        
        {/* Workspace Header */}
        <div className="bg-white border-b border-[#DDD8C8] px-8 py-6 shadow-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#122C4A] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Requiring Body Profile</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#122C4A]">National Highways Authority of India (NHAI)</h1>
            <p className="text-sm text-[#5B6472] mt-1">Regional Office: Madhya Pradesh | Agency ID: RB-NHAI-023</p>
          </div>
          
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="bg-[#1D5FA8] hover:bg-[#122C4A] text-white font-bold py-3 px-6 rounded shadow-sm transition text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Initiate New Acquisition
          </button>
        </div>

        <div className="max-w-[1536px] mx-auto px-8 py-8">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-[#DDD8C8] rounded-lg p-6 shadow-sm border-l-4 border-l-[#1D5FA8]">
              <p className="text-xs font-bold text-[#5B6472] uppercase tracking-wider mb-1">Active Projects</p>
              <h2 className="text-3xl font-serif font-bold text-[#122C4A]">12</h2>
            </div>
            <div className="bg-white border border-[#DDD8C8] rounded-lg p-6 shadow-sm border-l-4 border-l-[#F2A71B]">
              <p className="text-xs font-bold text-[#5B6472] uppercase tracking-wider mb-1">Total Target Land</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-serif font-bold text-[#122C4A]">450.5</h2>
                <span className="text-sm font-bold text-gray-500">Hectares</span>
              </div>
            </div>
            <div className="bg-white border border-[#DDD8C8] rounded-lg p-6 shadow-sm border-l-4 border-l-green-600">
              <p className="text-xs font-bold text-[#5B6472] uppercase tracking-wider mb-1">Total Capital Escrowed</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-serif font-bold text-[#122C4A]">₹ 2,450</h2>
                <span className="text-sm font-bold text-gray-500">Crores</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Project Pipeline (Takes 2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between border-b border-[#DDD8C8] pb-2">
                <h2 className="text-lg font-bold text-[#122C4A] uppercase tracking-wide">Ongoing Acquisitions</h2>
                <div className="relative">
                  <input type="text" placeholder="Search projects..." className="text-sm border border-[#DDD8C8] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#1D5FA8]" />
                </div>
              </div>

              <div className="space-y-5">
                {ONGOING_PROJECTS.map((project) => (
                  <div key={project.id} className="bg-white border border-[#DDD8C8] rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#1D5FA8] bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">{project.id}</span>
                        <h3 className="text-lg font-bold text-[#1B2430] mt-2">{project.name}</h3>
                        <p className="text-xs text-[#5B6472] mt-0.5">Purpose: {project.purpose} | Target Area: {project.targetArea}</p>
                      </div>
                      <div className="text-right bg-[#FDF8E3] border border-[#E7DFB8] p-3 rounded">
                        <p className="text-[10px] font-bold text-[#B96E22] uppercase">Escrow Budget</p>
                        <p className="font-bold text-[#122C4A]">{project.budget}</p>
                      </div>
                    </div>

                    {/* Simple Statutory Stage Tracker */}
                    <div className="mt-6 mb-2 relative">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${project.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1D5FA8]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span className={project.progress >= 25 ? "text-[#1D5FA8]" : ""}>Sec 11 (Prelim)</span>
                        <span className={project.progress >= 50 ? "text-[#1D5FA8]" : ""}>Sec 15 (Hearing)</span>
                        <span className={project.progress >= 75 ? "text-[#1D5FA8]" : ""}>Sec 19 (Declaration)</span>
                        <span className={project.progress >= 100 ? "text-green-600" : ""}>Sec 21 (Award)</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-500">Current Status: <span className="text-[#1B2430]">{project.stage}</span></span>
                      <button className="text-sm font-bold text-[#1D5FA8] hover:underline">View Project Details &rarr;</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Dashboards & Alerts */}
            <div className="space-y-6">
              
              {/* Financial Health / Escrow Status */}
              <div className="bg-white border border-[#DDD8C8] rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#122C4A] uppercase tracking-wide border-b border-[#DDD8C8] pb-2 mb-4">Financial Escrow Health</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#5B6472] mb-1">
                      <span>Total Deposited to State</span>
                      <span className="text-[#122C4A]">₹ 2,450 Cr</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-[#122C4A] h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#5B6472] mb-1">
                      <span>Disbursed to Citizens (Awards)</span>
                      <span className="text-green-600">₹ 820 Cr</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#5B6472] mb-1">
                      <span>Idle in Escrow (Pending Awards)</span>
                      <span className="text-[#F2A71B]">₹ 1,630 Cr</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-[#F2A71B] h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-[#EAF0F7] text-[#1D5FA8] text-xs font-bold py-2 rounded hover:bg-[#1D5FA8] hover:text-white transition border border-[#1D5FA8]">
                  Transfer Additional Funds via PFMS
                </button>
              </div>

              {/* Clearance & Bottleneck Radar */}
              <div className="bg-white border border-[#DDD8C8] rounded-lg shadow-sm p-6 border-l-4 border-l-red-500">
                <h3 className="text-sm font-bold text-[#122C4A] uppercase tracking-wide mb-1">Pending Clearances</h3>
                <p className="text-[10px] text-gray-500 mb-4">Bottlenecks blocking acquisition stages.</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-red-50 p-3 rounded border border-red-100">
                    <div className="bg-red-100 text-red-600 p-1.5 rounded shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B2430]">Environmental Clearance (MoEFCC)</p>
                      <p className="text-[10px] text-gray-500">Required for Bhopal-Itarsi Railway Line</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-amber-50 p-3 rounded border border-amber-100">
                    <div className="bg-amber-100 text-amber-600 p-1.5 rounded shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B2430]">Utility Shifting (State Electricity)</p>
                      <p className="text-[10px] text-gray-500">Pending HT Line removal on NH-44</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: INITIATE NEW PROJECT WIZARD         */}
      {/* ========================================== */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#122C4A] text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-bold text-lg">Initiate New Land Acquisition</h2>
              <button onClick={() => setShowNewProjectModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded text-xs text-blue-800">
                <strong>Notice:</strong> Please upload alignment details to automatically notify the District Collector (CALA) for Social Impact Assessment (SIA).
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5B6472] mb-1">Project Name</label>
                <input type="text" placeholder="e.g., Eastern Dedicated Freight Corridor" className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#DDD8C8] rounded focus:outline-none focus:border-[#1D5FA8]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#5B6472] mb-1">Public Purpose Category</label>
                  <select className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#DDD8C8] rounded focus:outline-none focus:border-[#1D5FA8] text-sm">
                    <option>Infrastructure - Highways</option>
                    <option>Infrastructure - Railways</option>
                    <option>Strategic / Defense</option>
                    <option>Industrial Corridor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5B6472] mb-1">Initial Escrow Allocation (₹)</label>
                  <input type="number" placeholder="Enter amount in Crores" className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#DDD8C8] rounded focus:outline-none focus:border-[#1D5FA8]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5B6472] mb-1">Upload Alignment Map (KML / Shapefile)</label>
                <div className="border-2 border-dashed border-[#DDD8C8] bg-[#F8FAFC] rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition">
                  <svg className="w-8 h-8 mb-2 text-[#1D5FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                  <span className="text-sm font-bold text-[#122C4A]">Click to Upload `.kml` or `.zip` shapefile</span>
                  <span className="text-[10px] mt-1">System will auto-extract affected villages and Khasras.</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-[#DDD8C8]">
              <button onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800 transition">Cancel</button>
              <button 
                onClick={() => {
                  alert("Project proposed successfully! Sent to District Collector for review.");
                  setShowNewProjectModal(false);
                }} 
                className="bg-[#1D5FA8] hover:bg-[#122C4A] text-white text-sm font-bold px-6 py-2 rounded shadow-sm transition"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}