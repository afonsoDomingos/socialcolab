import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await req.json();
        const task = await Task.findByIdAndUpdate(params.id, body, { new: true })
            .populate("assignee", "name avatar role department")
            .lean();
        if (!task) return NextResponse.json({ success: false, error: "Tarefa não encontrada" }, { status: 404 });
        return NextResponse.json({ success: true, data: task });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        await Task.findByIdAndDelete(params.id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
