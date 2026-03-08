"use client";
import { Bell, Plus, Search } from "lucide-react";
import { currentUser } from "@/lib/data";

interface TopbarProps {
    title: string;
    subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
    return (
        <header
            style={{
                height: 64,
                background: "white",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 16,
                position: "sticky",
                top: 0,
                zIndex: 30,
                flexShrink: 0,
            }}
        >
            {/* Title */}
            <div style={{ flex: 1 }}>
                <h1
                    style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0F172A",
                        letterSpacing: "-0.3px",
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ fontSize: 13, color: "#64748B", marginTop: 1 }}>
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Search */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "8px 14px",
                    width: 280,
                    cursor: "pointer",
                    transition: "all 0.2s",
                }}
            >
                <Search size={15} color="#94A3B8" />
                <span style={{ fontSize: 13, color: "#94A3B8" }}>
                    Pesquisar na plataforma...
                </span>
            </div>

            {/* New Post */}
            <button className="btn-primary" style={{ fontSize: 13 }}>
                <Plus size={16} />
                Publicar
            </button>

            {/* Notifications */}
            <button
                style={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    flexShrink: 0,
                }}
            >
                <Bell size={18} color="#64748B" />
                <span
                    className="badge"
                    style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        background: "#EF4444",
                        color: "white",
                        fontSize: 9,
                        minWidth: 16,
                        height: 16,
                    }}
                >
                    5
                </span>
            </button>

            {/* Avatar */}
            <div
                style={{
                    position: "relative",
                    cursor: "pointer",
                    flexShrink: 0,
                }}
            >
                <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "2.5px solid #2563EB",
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        background: "#10B981",
                        border: "2px solid white",
                    }}
                />
            </div>
        </header>
    );
}
