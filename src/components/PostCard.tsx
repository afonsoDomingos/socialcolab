"use client";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Post } from "@/lib/data";
import { useState } from "react";

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
    announcement: { bg: "rgba(37,99,235,0.08)", text: "#2563EB", label: "📣 Comunicado" },
    achievement: { bg: "rgba(16,185,129,0.08)", text: "#059669", label: "🏆 Conquista" },
    idea: { bg: "rgba(124,58,237,0.08)", text: "#7C3AED", label: "💡 Ideia" },
    text: { bg: "transparent", text: "#64748B", label: "" },
};

export default function PostCard({ post }: { post: Post }) {
    const [liked, setLiked] = useState(post.liked);
    const [likes, setLikes] = useState(post.likes);
    const [saved, setSaved] = useState(false);

    const typeInfo = typeColors[post.type];

    return (
        <div
            style={{
                background: "white",
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
            }}
            className="card-hover"
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 14,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                border: "2px solid #E2E8F0",
                            }}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: 14,
                                color: "#0F172A",
                                lineHeight: 1.3,
                            }}
                        >
                            {post.author.name}
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: "#94A3B8",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                marginTop: 2,
                            }}
                        >
                            <span>{post.author.role}</span>
                            {post.department && (
                                <>
                                    <span>·</span>
                                    <span
                                        style={{
                                            padding: "1px 8px",
                                            background: "#F1F5F9",
                                            borderRadius: 20,
                                            fontSize: 11,
                                            fontWeight: 500,
                                            color: "#64748B",
                                        }}
                                    >
                                        {post.department}
                                    </span>
                                </>
                            )}
                            <span>·</span>
                            <span>{post.timestamp}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {post.type !== "text" && (
                        <span
                            style={{
                                padding: "4px 10px",
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 600,
                                background: typeInfo.bg,
                                color: typeInfo.text,
                            }}
                        >
                            {typeInfo.label}
                        </span>
                    )}
                    <button
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: "1px solid #E2E8F0",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#94A3B8",
                        }}
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <p
                style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#334155",
                    marginBottom: 14,
                }}
            >
                {post.content}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 16,
                    }}
                >
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                padding: "3px 10px",
                                background: "#EFF6FF",
                                color: "#2563EB",
                                borderRadius: 20,
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Divider */}
            <div
                style={{ borderTop: "1px solid #F1F5F9", marginBottom: 12 }}
            />

            {/* Actions */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                }}
            >
                <button
                    onClick={() => {
                        setLiked(!liked);
                        setLikes(liked ? likes - 1 : likes + 1);
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: "none",
                        background: liked ? "rgba(239,68,68,0.08)" : "transparent",
                        color: liked ? "#EF4444" : "#64748B",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    <Heart
                        size={16}
                        fill={liked ? "#EF4444" : "none"}
                        color={liked ? "#EF4444" : "#94A3B8"}
                    />
                    {likes}
                </button>

                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: "none",
                        background: "transparent",
                        color: "#64748B",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    <MessageCircle size={16} color="#94A3B8" />
                    {post.comments}
                </button>

                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: "none",
                        background: "transparent",
                        color: "#64748B",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    <Share2 size={16} color="#94A3B8" />
                    Partilhar
                </button>

                <button
                    onClick={() => setSaved(!saved)}
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px",
                        borderRadius: 10,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <Bookmark
                        size={16}
                        fill={saved ? "#2563EB" : "none"}
                        color={saved ? "#2563EB" : "#94A3B8"}
                    />
                </button>
            </div>
        </div>
    );
}
