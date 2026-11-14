"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md animate-modal-in transition-all bg-white text-slate-800 border-slate-200">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isSuccess
            ? "bg-emerald-100 text-emerald-600"
            : "bg-rose-100 text-rose-600"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
      </div>

      <div className="text-sm font-medium pr-2 max-w-sm">
        {toast.message}
      </div>

      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
