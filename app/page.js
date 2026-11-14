"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import StatsOverview from "@/components/StatsOverview";
import StudentList from "@/components/StudentList";
import StudentModal from "@/components/StudentModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import StudentViewModal from "@/components/StudentViewModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewingStudent, setViewingStudent] = useState(null);

  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Fetch all students from the API
  const fetchStudents = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setIsRefreshing(true);
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.success) {
        setStudents(data.data || []);
      } else {
        showToast(data.message || "Failed to load students", "error");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      showToast("Could not connect to API server", "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Open Create Student Modal
  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  // Open Edit Student Modal
  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  // Submit Create or Edit Student
  const handleSubmitStudent = async (formData) => {
    try {
      setIsSubmitting(true);
      const isEdit = Boolean(editingStudent);
      const url = isEdit
        ? `/api/students/${editingStudent._id}`
        : "/api/students";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast(data.message || (isEdit ? "Student updated!" : "Student added!"), "success");
        setIsModalOpen(false);
        setEditingStudent(null);
        await fetchStudents();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch (error) {
      console.error("Submit student error:", error);
      showToast("An unexpected network error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Student
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/students/${deletingStudent._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        showToast(data.message || "Student removed successfully", "success");
        setDeletingStudent(null);
        await fetchStudents();
      } else {
        showToast(data.message || "Failed to delete student", "error");
      }
    } catch (error) {
      console.error("Delete student error:", error);
      showToast("Network error while deleting student", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Seed Initial Demo Students
  const handleSeedDemo = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, "success");
        await fetchStudents();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Seed error:", error);
      showToast("Failed to seed demo data", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Navbar */}
      <Navbar
        onAddNewStudent={handleOpenAddModal}
        totalStudents={students.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Banner */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your student records with full Create, Read, Update, and Delete (CRUD) capabilities powered by Next.js & MongoDB.
          </p>
        </div>

        {/* Metric Cards */}
        <StatsOverview
          students={students}
          onRefresh={() => fetchStudents(true)}
          onSeed={handleSeedDemo}
          isRefreshing={isRefreshing}
        />

        {/* Student List & Search/Filter Section */}
        <StudentList
          students={students}
          isLoading={isLoading}
          onAddNew={handleOpenAddModal}
          onEdit={handleOpenEditModal}
          onDelete={(student) => setDeletingStudent(student)}
          onView={(student) => setViewingStudent(student)}
          onSeed={handleSeedDemo}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Student Management System. Built for Ostad Module 17 Assignment.</p>
          <p className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Next.js • Tailwind CSS • MongoDB • Mongoose</span>
          </p>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleSubmitStudent}
        student={editingStudent}
        isLoading={isSubmitting}
      />

      <StudentViewModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        onEdit={(student) => {
          setViewingStudent(null);
          handleOpenEditModal(student);
        }}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingStudent)}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
        student={deletingStudent}
        isLoading={isDeleting}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
