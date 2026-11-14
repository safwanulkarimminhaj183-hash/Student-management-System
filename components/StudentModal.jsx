"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, GraduationCap, Loader2 } from "lucide-react";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electrical & Electronic Engineering",
  "Information Technology",
  "Software Engineering",
  "Business Administration",
  "Civil Engineering",
  "Mechanical Engineering",
  "Data Science & AI",
  "Other",
];

export default function StudentModal({ isOpen, onClose, onSubmit, student, isLoading }) {
  const isEdit = Boolean(student);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        department: student.department || DEPARTMENTS[0],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: DEPARTMENTS[0],
      });
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Student name is required";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errs.email = "Student email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 6) {
      errs.phone = "Phone must be at least 6 digits";
    }

    if (!formData.department.trim()) {
      errs.department = "Department is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-modal-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEdit ? "Edit Student Information" : "Register New Student"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? "Update student record details below"
                : "Fill in the required fields to add a student to the system"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Rahim Ahmed"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                disabled={isLoading}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                  errors.name
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                } focus:outline-none focus:ring-2 transition-all bg-white`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="e.g. rahim.ahmed@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                disabled={isLoading}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                  errors.email
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                } focus:outline-none focus:ring-2 transition-all bg-white`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. +8801712345678"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                disabled={isLoading}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                  errors.phone
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                } focus:outline-none focus:ring-2 transition-all bg-white`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Department <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <select
                value={formData.department}
                onChange={(e) => {
                  setFormData({ ...formData, department: e.target.value });
                  if (errors.department) setErrors({ ...errors, department: null });
                }}
                disabled={isLoading}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                  errors.department
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                } focus:outline-none focus:ring-2 transition-all bg-white appearance-none cursor-pointer`}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            {errors.department && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.department}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center space-x-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isEdit ? "Save Changes" : "Create Student"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
