# Student Management System (CRUD)

A full-stack Student Management System built with **Next.js (App Router)**, **Tailwind CSS**, **MongoDB**, and **Mongoose**, developed according to the requirements of **Ostad Module 17 Assignment**.

---

## 📌 Project Overview

This application provides a complete solution for managing student records with full CRUD (Create, Read, Update, Delete) capabilities, responsive UI, search & filtering, department categorization, and database persistence.

### Student Data Fields
Each student record contains:
1. **Name** (`String`, required) — Student's full name.
2. **Email** (`String`, required, unique) — Validated email address.
3. **Phone** (`String`, required) — Student contact number.
4. **Department** (`String`, required) — Academic discipline (e.g., Computer Science, Electrical Engineering, Software Engineering, Business Administration, Data Science, etc.).

---

## 🚀 Key Features (CRUD)

- **Create (নতুন Student যুক্ত করা)**:
  - Interactive registration modal with client and server-side validation.
  - Automatic duplicate email detection.
  - Real-time field validation with friendly error hints.

- **Read (সকল Student-এর তথ্য দেখা)**:
  - Clean, responsive table view for desktop and card layout for mobile devices.
  - Color-coded department badges and dynamic avatar initials.
  - Real-time search by name, email, phone number, or department.
  - Department filtering dropdown and sorting options (Newest, Oldest, Name A-Z, Name Z-A).
  - Single student profile view modal showing full details and timestamps.

- **Update (Student-এর তথ্য Edit করা)**:
  - Edit student modal pre-filled with existing data.
  - Preserves uniqueness checks while updating.

- **Delete (Student-এর তথ্য Delete করা)**:
  - Safe deletion workflow with a confirmation modal displaying the student's name and email to prevent accidental loss.

- **Seed Demo Data Helper**:
  - One-click sample dataset generator (`/api/seed`) for easy instructor evaluation and testing.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- **ORM / ODM**: [Mongoose](https://mongoosejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
student-management-system/
├── app/
│   ├── api/
│   │   ├── students/
│   │   │   ├── route.js          # GET (all students), POST (create student)
│   │   │   └── [id]/
│   │   │       └── route.js      # GET (single), PUT (update), DELETE (remove)
│   │   └── seed/
│   │       └── route.js          # POST (seed demo students)
│   ├── favicon.ico
│   ├── globals.css               # Tailwind CSS configuration
│   ├── layout.js                 # Root layout & metadata
│   └── page.js                   # Main application dashboard
├── components/
│   ├── DeleteConfirmModal.jsx    # Deletion confirmation dialog
│   ├── Navbar.jsx                # Header with branding & connection status
│   ├── StatsOverview.jsx         # Summary cards (Total, Departments, etc.)
│   ├── StudentList.jsx           # Table/Card listing with search & filters
│   ├── StudentModal.jsx          # Create and Edit form modal
│   ├── StudentViewModal.jsx      # Student profile view modal
│   └── Toast.jsx                 # Notification toasts
├── lib/
│   └── mongodb.js                # Cached Mongoose connection utility
├── models/
│   └── Student.js                # Mongoose schema and model
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment variables
├── package.json
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Get all students (Supports `?search=`, `?department=`, `?sort=`) |
| `POST` | `/api/students` | Register a new student |
| `GET` | `/api/students/:id` | Get single student details |
| `PUT` | `/api/students/:id` | Update an existing student |
| `DELETE` | `/api/students/:id` | Delete a student record |
| `POST` | `/api/seed` | Seed initial sample students |

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd student-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# Local MongoDB:
MONGODB_URI=mongodb://127.0.0.1:27017/student_management_db

# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_management_db?retryWrites=true&w=majority
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📤 Submission Instructions

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Complete Ostad Module 17 Student Management System (CRUD)"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Copy your GitHub repository URL (e.g. `https://github.com/<your-username>/<your-repo-name>`).
3. Paste the URL into the Ostad Assignment Submission box and submit before the deadline.
