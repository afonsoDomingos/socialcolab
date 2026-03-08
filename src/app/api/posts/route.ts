import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const department = searchParams.get("department");
        const type = searchParams.get("type");
        const limit = parseInt(searchParams.get("limit") ?? "20");
        const skip = parseInt(searchParams.get("skip") ?? "0");

        const filter: Record<string, unknown> = {};
        if (department) filter.department = department;
        if (type) filter.type = type;

        const posts = await Post.find(filter)
            .populate("author", "name role department avatar status")
            .populate("comments.author", "name avatar")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();

        return NextResponse.json({ success: true, data: posts });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { authorId, content, type, department, tags, image } = body;

        if (!authorId || !content) {
            return NextResponse.json(
                { success: false, error: "authorId e content são obrigatórios" },
                { status: 400 }
            );
        }

        let imageUrl: string | null = null;
        let imagePublicId: string | null = null;

        if (image) {
            const { uploadToCloudinary } = await import("@/lib/cloudinary");
            const result = await uploadToCloudinary(image, { folder: "socialcolab/posts" });
            imageUrl = result.url;
            imagePublicId = result.publicId;
        }

        const post = await Post.create({
            author: authorId,
            content,
            type: type ?? "text",
            department: department ?? null,
            tags: tags ?? [],
            image: imageUrl,
            imagePublicId,
        });

        const populated = await post.populate("author", "name role department avatar status");

        return NextResponse.json({ success: true, data: populated }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
