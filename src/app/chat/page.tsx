"use client";
import Topbar from "@/components/Topbar";
import { conversations, users } from "@/lib/data";
import { useState } from "react";
import {
    Search, Send, Phone, Video, MoreHorizontal,
    Smile, Paperclip, Plus, Check, CheckCheck
} from "lucide-react";
import { currentUser } from "@/lib/data";

const mockMessages = [
    {
        id: "m1", fromMe: false, text: "Olá Ana! Já viste o relatório de analytics que enviei?",
        time: "14:20", read: true
    },
    {
        id: "m2", fromMe: true, text: "Sim! Ficou muito bom. Os números de Fevereiro superaram todas as expectativas 🎉",
        time: "14:22", read: true
    },
    {
        id: "m3", fromMe: false, text: "Exatamente! O crescimento de 23% em conversões é inacreditável para este período.",
        time: "14:23", read: true
    },
    {
        id: "m4", fromMe: true, text: "Precisamos de apresentar isto ao Carlos na reunião de sexta. Podes preparar os slides?",
        time: "14:25", read: true
    },
    {
        id: "m5", fromMe: false, text: "Claro! Vou preparar uma apresentação completa. Preferes foco nos números ou na narrativa?",
        time: "14:28", read: true
    },
    {
        id: "m6", fromMe: true, text: "Ambos idealmente. Mas começa pelos números, depois contrua a história em cima disso.",
        time: "14:30", read: false
    },
    {
        id: "m7", fromMe: false, text: "Perfeito! Vou ter os slides prontos para quinta de manhã então revemos juntos.",
        time: "14:32", read: false
    },
];

const statusColors: Record<string, string> = {
    online: "#4B5563",
    busy: "#6B7280",
    away: "#94A3B8",
    meeting: "#6B7280",
};

export default function ChatPage() {
    const [selected, setSelected] = useState(conversations[0]);
    const [messageText, setMessageText] = useState("");
    const [search, setSearch] = useState("");

    const filtered = conversations.filter(c =>
        c.user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Topbar title="Mensagens" subtitle="Chat interno da empresa" />
            <div style={{ display: "flex", flex: 1, height: "calc(100vh - 64px)", overflow: "hidden" }}>

                {/* Conversations List */}
                <div style={{
                    width: 320,
                    borderRight: "1px solid #E2E8F0",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                }}>
                    {/* Search + New */}
                    <div style={{ padding: "16px", borderBottom: "1px solid #F1F5F9" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                background: "#F8FAFC",
                                border: "1.5px solid #E2E8F0",
                                borderRadius: 10,
                                padding: "8px 12px",
                            }}>
                                <Search size={14} color="#94A3B8" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Pesquisar..."
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontSize: 13,
                                        color: "#334155",
                                        fontFamily: "Inter, sans-serif",
                                        width: "100%",
                                    }}
                                />
                            </div>
                            <button style={{
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #111827, #4B5563)",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                flexShrink: 0,
                            }}>
                                <Plus size={16} color="white" />
                            </button>
                        </div>
                    </div>

                    {/* Conversations */}
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {filtered.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setSelected(conv)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "12px 16px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #F8FAFC",
                                    background: selected.id === conv.id ? "#EFF6FF" : "transparent",
                                    transition: "all 0.15s",
                                }}
                            >
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <img
                                        src={conv.user.avatar}
                                        alt={conv.user.name}
                                        style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #E2E8F0" }}
                                    />
                                    <span style={{
                                        position: "absolute",
                                        bottom: 1,
                                        right: 1,
                                        width: 11,
                                        height: 11,
                                        borderRadius: "50%",
                                        background: statusColors[conv.user.status],
                                        border: "2px solid white",
                                    }} />
                                </div>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                                            {conv.user.name.split(" ").slice(0, 2).join(" ")}
                                        </span>
                                        <span style={{ fontSize: 11, color: "#94A3B8" }}>{conv.lastTime}</span>
                                    </div>
                                    <div style={{
                                        fontSize: 12,
                                        color: conv.unread > 0 ? "#334155" : "#94A3B8",
                                        fontWeight: conv.unread > 0 ? 600 : 400,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        marginTop: 2,
                                    }}>
                                        {conv.lastMessage}
                                    </div>
                                </div>
                                {conv.unread > 0 && (
                                    <span className="badge" style={{ background: "#111827", color: "white", flexShrink: 0 }}>
                                        {conv.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
                    {/* Chat Header */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 24px",
                        background: "white",
                        borderBottom: "1px solid #E2E8F0",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ position: "relative" }}>
                                <img
                                    src={selected.user.avatar}
                                    alt={selected.user.name}
                                    style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #E2E8F0" }}
                                />
                                <span style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: statusColors[selected.user.status],
                                    border: "2px solid white",
                                }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                                    {selected.user.name}
                                </div>
                                <div style={{ fontSize: 12, color: "#94A3B8" }}>
                                    {selected.user.role} · {selected.user.department}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                                <button key={i} style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    border: "1px solid #E2E8F0",
                                    background: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "#64748B",
                                }}>
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Date separator */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                            <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>Hoje</span>
                            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                        </div>

                        {mockMessages.map(msg => (
                            <div key={msg.id} style={{
                                display: "flex",
                                flexDirection: msg.fromMe ? "row-reverse" : "row",
                                alignItems: "flex-end",
                                gap: 8,
                            }}>
                                {!msg.fromMe && (
                                    <img
                                        src={selected.user.avatar}
                                        alt=""
                                        style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}
                                    />
                                )}
                                <div style={{
                                    maxWidth: "60%",
                                    padding: "12px 16px",
                                    borderRadius: msg.fromMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                    background: msg.fromMe
                                        ? "linear-gradient(135deg, #111827, #4B5563)"
                                        : "white",
                                    color: msg.fromMe ? "white" : "#334155",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                    border: msg.fromMe ? "none" : "1px solid #E2E8F0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                }}>
                                    {msg.text}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        marginTop: 6,
                                        justifyContent: msg.fromMe ? "flex-end" : "flex-start",
                                    }}>
                                        <span style={{ fontSize: 10, opacity: 0.7 }}>{msg.time}</span>
                                        {msg.fromMe && (
                                            msg.read
                                                ? <CheckCheck size={12} style={{ opacity: 0.7 }} />
                                                : <Check size={12} style={{ opacity: 0.7 }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div style={{
                        padding: "16px 24px",
                        background: "white",
                        borderTop: "1px solid #E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}>
                        <button style={{ color: "#94A3B8", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
                            <Paperclip size={20} />
                        </button>
                        <div style={{ flex: 1, position: "relative" }}>
                            <input
                                value={messageText}
                                onChange={e => setMessageText(e.target.value)}
                                placeholder="Escreve uma mensagem..."
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    background: "#F8FAFC",
                                    border: "1.5px solid #E2E8F0",
                                    borderRadius: 14,
                                    fontSize: 14,
                                    color: "#334155",
                                    outline: "none",
                                    fontFamily: "Inter, sans-serif",
                                    transition: "border-color 0.2s",
                                }}
                            />
                        </div>
                        <button style={{ color: "#94A3B8", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
                            <Smile size={20} />
                        </button>
                        <button style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: messageText ? "linear-gradient(135deg, #111827, #4B5563)" : "#F1F5F9",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            flexShrink: 0,
                        }}>
                            <Send size={18} color={messageText ? "white" : "#94A3B8"} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
