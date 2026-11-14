import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

// GET /api/students - Retrieve all students (Supports ?search=, ?department=, ?sort=)
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const sort = searchParams.get("sort") || "newest";

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (department && department !== "All") {
      query.department = department;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "name-asc") sortOption = { name: 1 };
    if (sort === "name-desc") sortOption = { name: -1 };

    const students = await Student.find(query).sort(sortOption).lean();

    return NextResponse.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST /api/students - Create a new student
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, phone, department } = body;

    // Validation
    if (!name || !email || !phone || !department) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields (name, email, phone, department) are required.",
        },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingStudent = await Student.findOne({ email: email.toLowerCase().trim() });
    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "A student with this email address already exists.",
        },
        { status: 409 }
      );
    }

    const newStudent = await Student.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      department: department.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student registered successfully!",
        data: newStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/students error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A student with this email address already exists." },
        { status: 409 }
      );
    }

    // Validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message || "Failed to create student" },
      { status: 500 }
    );
  }
}
