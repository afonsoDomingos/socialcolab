"use client";
import { Bell, Plus, Search, Menu } from "lucide-react";
import { currentUser } from "@/lib/data";
import { useUI } from "@/components/AppLayout";
import { useRouter } from "next/navigation";

interface TopbarProps {
    title: string;
    subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
    const { toggleSidebar, searchQuery, setSearchQuery } = useUI();
    const router = useRouter();

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
            <button
                onClick={toggleSidebar}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0F172A",
                }}
            >
                <Menu size={20} />
            </button>
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
                    transition: "all 0.2s",
                }}
            >
                <Search size={15} color="#94A3B8" />
                <input
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim() !== '') {
                            router.push('/pesquisa');
                        }
                    }}
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontSize: 13,
                        color: "#334155",
                        width: "100%"
                    }}
                />
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
                        background: "#6B7280",
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
                        border: "2.5px solid #111827",
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
                        background: "#4B5563",
                        border: "2px solid white",
                    }}
                />
            </div>
        </header>
    );
}
