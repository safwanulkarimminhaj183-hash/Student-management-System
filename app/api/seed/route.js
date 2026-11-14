import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

const sampleStudents = [
  {
    name: "Rahim Ahmed",
    email: "rahim.ahmed@example.com",
    phone: "+8801712345678",
    department: "Computer Science & Engineering",
  },
  {
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    phone: "+8801819876543",
    department: "Electrical & Electronic Engineering",
  },
  {
    name: "Tanvir Hasan",
    email: "tanvir.hasan@example.com",
    phone: "+8801911223344",
    department: "Software Engineering",
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+8801615566778",
    department: "Business Administration",
  },
  {
    name: "Sakib Al Mahmud",
    email: "sakib.mahmud@example.com",
    phone: "+8801519988776",
    department: "Data Science & AI",
  },
];

export async function POST() {
  try {
    await dbConnect();

    // Check count
    const existingCount = await Student.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already contains ${existingCount} students. Seed skipped.`,
        count: existingCount,
      });
    }

    const inserted = await Student.insertMany(sampleStudents);

    return NextResponse.json({
      success: true,
      message: "Successfully seeded initial sample students!",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error("POST /api/seed error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to seed students" },
      { status: 500 }
    );
  }
}
