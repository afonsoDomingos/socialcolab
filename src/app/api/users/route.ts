import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const department = searchParams.get("department");
        const filter: Record<string, unknown> = {};
        if (department) filter.departmentId = department;
        const users = await User.find(filter).select("-password").lean();
        return NextResponse.json({ success: true, data: users });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, password, role, department, departmentId, avatar } = body;

        if (!name || !email || !password || !role || !department) {
            return NextResponse.json({ success: false, error: "Campos obrigatórios em falta" }, { status: 400 });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return NextResponse.json({ success: false, error: "Email já registado" }, { status: 409 });
        }

        let avatarUrl = avatar ?? "";
        let avatarPublicId = "";

        if (avatar && avatar.startsWith("data:")) {
            const { uploadToCloudinary } = await import("@/lib/cloudinary");
            const result = await uploadToCloudinary(avatar, {
                folder: "socialcolab/avatars",
                transformation: [{ width: 200, height: 200, crop: "fill", gravity: "face" }],
            });
            avatarUrl = result.url;
            avatarPublicId = result.publicId;
        }

        // Hash password (simples bcrypt via dynamic import)
        const bcrypt = await import("bcryptjs");
        const hashed = await bcrypt.default.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            department,
            departmentId: departmentId ?? department.toLowerCase().replace(/\s+/g, "-"),
            avatar: avatarUrl,
            avatarPublicId,
        });

        const { password: _, ...userWithoutPassword } = user.toObject();
        return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
