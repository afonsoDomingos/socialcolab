import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models";

// Like / Unlike
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const { userId } = await req.json();
        const post = await Post.findById(id);
        if (!post) return NextResponse.json({ success: false, error: "Post não encontrado" }, { status: 404 });

        const idx = post.likes.indexOf(userId);
        if (idx === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(idx, 1);
        }
        await post.save();

        return NextResponse.json({ success: true, likes: post.likes.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Add comment
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const { userId, content } = await req.json();
        const post = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: { author: userId, content } } },
            { new: true }
        ).populate("comments.author", "name avatar");

        return NextResponse.json({ success: true, data: post?.comments });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const post = await Post.findById(id).lean() as any;
        if (!post) return NextResponse.json({ success: false, error: "Post não encontrado" }, { status: 404 });

        if (post.imagePublicId) {
            const { deleteFromCloudinary } = await import("@/lib/cloudinary");
            await deleteFromCloudinary(post.imagePublicId);
        }

        await Post.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
