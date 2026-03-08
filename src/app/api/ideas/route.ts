import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Idea } from "@/models";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const status = searchParams.get("status");
        const filter: Record<string, unknown> = {};
        if (category) filter.category = category;
        if (status) filter.status = status;
        const ideas = await Idea.find(filter)
            .populate("author", "name avatar role department")
            .populate("comments.author", "name avatar")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json({ success: true, data: ideas });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const idea = await Idea.create(body);
        const populated = await idea.populate("author", "name avatar role department");
        return NextResponse.json({ success: true, data: populated }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
