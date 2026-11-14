import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

// Helper to resolve route params safely across Next.js versions
async function getParamId(params) {
  const resolved = params instanceof Promise ? await params : params;
  return resolved?.id;
}

// GET /api/students/[id] - Get a single student by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const id = await getParamId(params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student ID format" },
        { status: 400 }
      );
    }

    const student = await Student.findById(id).lean();

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("GET /api/students/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id] - Update an existing student
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const id = await getParamId(params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, phone, department } = body;

    if (!name || !email || !phone || !department) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields (name, email, phone, department) are required.",
        },
        { status: 400 }
      );
    }

    // Check if another student already uses this email
    const duplicateEmail = await Student.findOne({
      _id: { $ne: id },
      email: email.toLowerCase().trim(),
    });

    if (duplicateEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Another student already exists with this email address.",
        },
        { status: 409 }
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        department: department.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student updated successfully!",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("PUT /api/students/[id] error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Another student already exists with this email address.",
        },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message || "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE /api/students/[id] - Remove a student
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const id = await getParamId(params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student ID format" },
        { status: 400 }
      );
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully!",
      data: { id: deletedStudent._id, name: deletedStudent.name },
    });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete student" },
      { status: 500 }
    );
  }
}
