"use client";

import { X, User, Mail, Phone, GraduationCap, Calendar, Hash } from "lucide-react";

export default function StudentViewModal({ isOpen, onClose, student, onEdit }) {
  if (!isOpen || !student) return null;

  const initials = student.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  const formattedDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-modal-in">
        {/* Banner with avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-6 pb-12 relative text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
              Student Profile
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar floating */}
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                {initials}
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 mt-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{student.department}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3.5 divide-y divide-slate-100">
            {/* Email */}
            <div className="pt-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-500 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email Address</span>
              </div>
              <a
                href={`mailto:${student.email}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {student.email}
              </a>
            </div>

            {/* Phone */}
            <div className="pt-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-500 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Phone Number</span>
              </div>
              <a
                href={`tel:${student.phone}`}
                className="text-sm font-medium text-slate-800 hover:text-blue-600"
              >
                {student.phone}
              </a>
            </div>

            {/* Student ID */}
            <div className="pt-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-500 text-sm">
                <Hash className="w-4 h-4 text-slate-400" />
                <span>Student ID</span>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {student._id}
              </span>
            </div>

            {/* Registration Date */}
            <div className="pt-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-500 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Registered At</span>
              </div>
              <span className="text-sm text-slate-700">{formattedDate}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
