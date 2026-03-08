import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const department = searchParams.get("department");
        const status = searchParams.get("status");
        const assignee = searchParams.get("assignee");

        const filter: Record<string, unknown> = {};
        if (department) filter.department = department;
        if (status) filter.status = status;
        if (assignee) filter.assignee = assignee;

        const tasks = await Task.find(filter)
            .populate("assignee", "name avatar role department")
            .populate("createdBy", "name avatar")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, data: tasks });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const task = await Task.create(body);
        const populated = await task.populate("assignee", "name avatar role department");
        return NextResponse.json({ success: true, data: populated }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
