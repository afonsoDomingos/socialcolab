import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

/**
 * Faz upload de um ficheiro (Buffer ou data URL) para o Cloudinary
 * retorna o URL público seguro
 */
export async function uploadToCloudinary(
    file: string | Buffer,
    options: {
        folder?: string;
        transformation?: object[];
        public_id?: string;
    } = {}
): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: options.folder ?? "socialcolab",
                transformation: options.transformation,
                public_id: options.public_id,
                resource_type: "auto",
            },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );

        if (typeof file === "string") {
            // data URL
            const buffer = Buffer.from(file.split(",")[1] ?? file, "base64");
            uploadStream.end(buffer);
        } else {
            uploadStream.end(file);
        }
    });
}

/**
 * Remove um ficheiro do Cloudinary pelo seu publicId
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
}
