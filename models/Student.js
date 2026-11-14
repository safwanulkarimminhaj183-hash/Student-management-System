import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [6, "Phone number must be at least 6 digits"],
      maxlength: [20, "Phone number cannot exceed 20 digits"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      enum: {
        values: [
          "Computer Science & Engineering",
          "Electrical & Electronic Engineering",
          "Information Technology",
          "Software Engineering",
          "Business Administration",
          "Civil Engineering",
          "Mechanical Engineering",
          "Data Science & AI",
          "Other",
        ],
        message: "{VALUE} is not a valid department",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite upon hot reloads in Next.js development
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
