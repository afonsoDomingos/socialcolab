import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Document } from "@/models";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const department = searchParams.get("department");
        const filter: Record<string, unknown> = {};
        if (department) filter.department = department;
        const docs = await Document.find(filter)
            .populate("uploadedBy", "name avatar role")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json({ success: true, data: docs });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const department = formData.get("department") as string;
        const uploadedBy = formData.get("uploadedBy") as string;
        const description = formData.get("description") as string ?? "";
        const tags = JSON.parse(formData.get("tags") as string ?? "[]");
        const confidentiality = formData.get("confidentiality") as string ?? "internal";

        if (!file || !name || !department || !uploadedBy) {
            return NextResponse.json({ success: false, error: "Campos obrigatórios em falta" }, { status: 400 });
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const { url, publicId } = await uploadToCloudinary(buffer, {
            folder: `socialcolab/documents/${department.toLowerCase()}`,
        });

        const doc = await Document.create({
            name,
            description,
            department,
            uploadedBy,
            fileUrl: url,
            filePublicId: publicId,
            fileType: file.type,
            fileSize: file.size,
            tags,
            confidentiality,
        });

        const populated = await doc.populate("uploadedBy", "name avatar role");
        return NextResponse.json({ success: true, data: populated }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
