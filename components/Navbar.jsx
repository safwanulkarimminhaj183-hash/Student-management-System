"use client";

import { GraduationCap, PlusCircle, Database, CheckCircle2 } from "lucide-react";

export default function Navbar({ onAddNewStudent, totalStudents }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Student Management System
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  CRUD App
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Next.js • Tailwind CSS • MongoDB • Mongoose
              </p>
            </div>
          </div>

          {/* Right Action & Status */}
          <div className="flex items-center space-x-3">
            {/* DB Status Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <Database className="w-3.5 h-3.5" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>MongoDB Connected</span>
            </div>

            {/* Add Student Button */}
            <button
              onClick={onAddNewStudent}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm transition-all shadow-sm shadow-blue-600/20 hover:shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
