"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home, MessageCircle, CheckSquare, Calendar, FolderOpen,
    Lightbulb, Award, BarChart2, Users, Bell, Settings,
    Search, ChevronDown, Building2, Hash
} from "lucide-react";
import { currentUser, departments } from "@/lib/data";

const mainNav = [
    { icon: Home, label: "Início", href: "/" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
    { icon: CheckSquare, label: "Tarefas", href: "/tarefas" },
    { icon: Calendar, label: "Agenda", href: "/agenda" },
    { icon: FolderOpen, label: "Documentos", href: "/documentos" },
    { icon: Lightbulb, label: "Ideias", href: "/ideias" },
    { icon: Award, label: "Reconhecimento", href: "/reconhecimento" },
    { icon: BarChart2, label: "Dashboard", href: "/dashboard" },
];

const statusColors: Record<string, string> = {
    online: "#10B981",
    busy: "#F59E0B",
    away: "#94A3B8",
    meeting: "#EF4444",
};
const statusLabels: Record<string, string> = {
    online: "Disponível",
    busy: "Ocupado",
    away: "Ausente",
    meeting: "Em reunião",
};

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            style={{
                width: 260,
                minWidth: 260,
                background: "#0F172A",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "sticky",
                top: 0,
                overflowY: "auto",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                zIndex: 40,
            }}
        >
            {/* Logo */}
            <div style={{ padding: "24px 20px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            flexShrink: 0,
                            boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
                        }}
                    >
                        🏢
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 17,
                                fontWeight: 800,
                                color: "white",
                                letterSpacing: "-0.3px",
                            }}
                        >
                            Social<span style={{ color: "#60A5FA" }}>Colab</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
                            Rede Corporativa
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div style={{ padding: "0 12px 16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 10,
                        padding: "9px 12px",
                        cursor: "pointer",
                    }}
                >
                    <Search size={14} color="#64748B" />
                    <span style={{ fontSize: 13, color: "#475569" }}>Pesquisar...</span>
                    <kbd
                        style={{
                            marginLeft: "auto",
                            fontSize: 10,
                            color: "#475569",
                            background: "rgba(255,255,255,0.06)",
                            padding: "2px 6px",
                            borderRadius: 5,
                            border: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ padding: "0 12px", flex: 1 }}>
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#334155",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0 4px 8px",
                    }}
                >
                    Navegação
                </div>
                {mainNav.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="sidebar-link"
                            style={{
                                marginBottom: 2,
                                ...(active && {
                                    background: "rgba(37,99,235,0.15)",
                                    color: "#60A5FA",
                                }),
                            }}
                        >
                            <item.icon
                                size={18}
                                color={active ? "#3B82F6" : "#64748B"}
                                style={{ flexShrink: 0 }}
                            />
                            {item.label}
                            {item.href === "/chat" && (
                                <span
                                    className="badge"
                                    style={{
                                        marginLeft: "auto",
                                        background: "#EF4444",
                                        color: "white",
                                        fontSize: 10,
                                    }}
                                >
                                    3
                                </span>
                            )}
                        </Link>
                    );
                })}

                {/* Departments */}
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#334155",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "20px 4px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Departamentos</span>
                    <Building2 size={12} color="#334155" />
                </div>
                {departments.slice(0, 6).map((dept) => {
                    const active = pathname === `/departamentos/${dept.id}`;
                    return (
                        <Link
                            key={dept.id}
                            href={`/departamentos/${dept.id}`}
                            className="sidebar-link"
                            style={{
                                marginBottom: 2,
                                ...(active && {
                                    background: "rgba(37,99,235,0.15)",
                                    color: "#60A5FA",
                                }),
                            }}
                        >
                            <span style={{ fontSize: 16, flexShrink: 0 }}>{dept.icon}</span>
                            <span
                                style={{
                                    fontSize: 13,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {dept.name}
                            </span>
                        </Link>
                    );
                })}
                <Link
                    href="/departamentos"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        fontSize: 12,
                        color: "#475569",
                        textDecoration: "none",
                        borderRadius: 8,
                        transition: "all 0.2s",
                    }}
                >
                    <ChevronDown size={14} />
                    Ver todos ({departments.length})
                </Link>
            </nav>

            {/* User Profile */}
            <div
                style={{
                    padding: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 12,
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            style={{ width: 34, height: 34, borderRadius: "50%" }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: statusColors[currentUser.status],
                                border: "2px solid #0F172A",
                            }}
                        />
                    </div>
                    <div style={{ overflow: "hidden", flex: 1 }}>
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#E2E8F0",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {currentUser.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#64748B" }}>
                            {statusLabels[currentUser.status]}
                        </div>
                    </div>
                    <Settings size={14} color="#475569" />
                </div>
            </div>
        </aside>
    );
}
