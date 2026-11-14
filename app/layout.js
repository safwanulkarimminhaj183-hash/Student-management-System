import "./globals.css";

export const metadata = {
  title: "Student Management System | Ostad Assignment",
  description: "Next.js & Tailwind CSS CRUD application using MongoDB and Mongoose",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
