"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  PlusCircle,
  User,
} from "lucide-react";

const DEPARTMENTS = [
  "All",
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

// Helper to color-code departments
const getDeptBadgeStyle = (dept) => {
  if (dept?.includes("Computer") || dept?.includes("Software")) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }
  if (dept?.includes("Electrical")) {
    return "bg-purple-50 text-purple-700 border-purple-200";
  }
  if (dept?.includes("Business")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  if (dept?.includes("Data") || dept?.includes("AI")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (dept?.includes("Civil")) {
    return "bg-teal-50 text-teal-700 border-teal-200";
  }
  if (dept?.includes("Mechanical")) {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }
  return "bg-slate-50 text-slate-700 border-slate-200";
};

export default function StudentList({
  students,
  isLoading,
  onAddNew,
  onEdit,
  onDelete,
  onView,
  onSeed,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Filtering & Sorting
  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDept === "All" || student.department === selectedDept;

      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      // default: newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Control Bar: Search, Department Filter, Sort */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-white space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, phone, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Filter */}
          <div className="relative flex items-center">
            <div className="absolute left-3 pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="pl-8 pr-8 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <div className="absolute left-3 pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-8 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium">Loading student records...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {searchTerm || selectedDept !== "All"
              ? "No matching students found"
              : "No students registered yet"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            {searchTerm || selectedDept !== "All"
              ? "Try adjusting your search criteria or clearing filters to find student records."
              : "Get started by adding your first student record or seeding sample demonstration data."}
          </p>

          <div className="flex items-center justify-center gap-3">
            {searchTerm || selectedDept !== "All" ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDept("All");
                }}
                className="px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            ) : (
              <>
                <button
                  onClick={onAddNew}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add First Student</span>
                </button>
                <button
                  onClick={onSeed}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Seed Demo Data</span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Student Info</th>
                  <th className="py-3.5 px-6">Contact</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Enrolled Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredStudents.map((student) => {
                  const initials = student.name
                    ? student.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "ST";

                  const dateStr = student.createdAt
                    ? new Date(student.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr
                      key={student._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block leading-tight">
                              {student.name}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              ID: {student._id?.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact: Email & Phone */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <a
                              href={`mailto:${student.email}`}
                              className="hover:text-blue-600 hover:underline truncate max-w-[200px]"
                            >
                              {student.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDeptBadgeStyle(
                            student.department
                          )}`}
                        >
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {student.department}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {dateStr}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => onView(student)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEdit(student)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Edit Student"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(student)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredStudents.map((student) => {
              const initials = student.name
                ? student.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "ST";

              return (
                <div key={student._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">
                          {student.name}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border mt-1 ${getDeptBadgeStyle(
                            student.department
                          )}`}
                        >
                          {student.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pl-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onView(student)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(student)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer Info */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {filteredStudents.length} of {students.length} students
        </span>
        <span className="font-medium">Ostad Module 17 Assignment</span>
      </div>
    </div>
  );
}
