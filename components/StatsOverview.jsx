"use client";

import { Users, Building2, UserCheck, Sparkles, RefreshCw } from "lucide-react";

export default function StatsOverview({ students, onRefresh, onSeed, isRefreshing }) {
  const total = students.length;

  // Calculate unique departments
  const uniqueDepartments = new Set(students.map((s) => s.department)).size;

  // Newest student
  const newestStudent = students.length > 0 ? students[0]?.name : "None yet";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Students */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Students
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{total}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Enrolled in system</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Departments */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Departments
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {uniqueDepartments}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Active academic disciplines</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* Latest Enrolled */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Latest Registered
          </p>
          <h3 className="text-base font-bold text-slate-900 mt-1 truncate max-w-[150px]">
            {newestStudent}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Most recent entry</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <UserCheck className="w-6 h-6" />
        </div>
      </div>

      {/* Quick Actions / Refresh */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Quick Actions
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Refresh list"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
            {total === 0 && (
              <button
                onClick={onSeed}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                title="Seed sample data"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Seed Data</span>
              </button>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
