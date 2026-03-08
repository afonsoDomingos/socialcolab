"use client";
import Topbar from "@/components/Topbar";
import { recognitions, users } from "@/lib/data";
import { useState } from "react";
import { Award, Plus, Star, TrendingUp, Users, Heart } from "lucide-react";

const badges = [
    { id: "excellence", label: "🌟 Excelência", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    { id: "hero", label: "⚡ Super Herói", color: "#7C3AED", bg: "rgba(124,58,237,0.1)" },
    { id: "top", label: "🏆 Top Performer", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
    { id: "heart", label: "❤️ Coração de Ouro", color: "#EC4899", bg: "rgba(236,72,153,0.1)" },
    { id: "innovation", label: "💡 Inovador", color: "#2563EB", bg: "rgba(37,99,235,0.1)" },
    { id: "team", label: "🤝 Espírito de Equipa", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
];

const topRecognized = users
    .map(u => ({ ...u, recognitionsCount: u.recognitions }))
    .sort((a, b) => b.recognitionsCount - a.recognitionsCount)
    .slice(0, 5);

export default function ReconhecimentoPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Topbar title="Reconhecimento" subtitle="Celebra os teus colegas" />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Hero */}
                <div style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                    borderRadius: 20,
                    padding: "28px 32px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", top: -30, right: 80, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ position: "absolute", bottom: -40, right: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div>
                        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>🏆 Sistema de Reconhecimento</div>
                        <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
                            Reconhece quem faz a diferença
                        </h2>
                        <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 420, lineHeight: 1.6 }}>
                            O reconhecimento entre colegas é uma das ferramentas mais poderosas
                            para criar uma cultura positiva e motivada.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "14px 24px",
                            borderRadius: 14,
                            border: "none",
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        <Plus size={18} />
                        Dar reconhecimento
                    </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
                    {/* Feed of recognitions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>
                            Reconhecimentos recentes
                        </h3>
                        {recognitions.map(rec => (
                            <div key={rec.id} style={{
                                background: "white",
                                borderRadius: 16,
                                border: "1px solid #E2E8F0",
                                padding: "20px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.2s",
                            }} className="card-hover">
                                {/* Background decoration */}
                                <div style={{
                                    position: "absolute",
                                    top: -20,
                                    right: -20,
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    background: "rgba(245,158,11,0.04)",
                                }} />

                                {/* Badge */}
                                <div style={{ marginBottom: 16 }}>
                                    <span style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "6px 14px",
                                        borderRadius: 20,
                                        background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1))",
                                        border: "1px solid rgba(245,158,11,0.2)",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#D97706",
                                    }}>
                                        {rec.badge}
                                    </span>
                                </div>

                                {/* From → To */}
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                        <img src={rec.from.avatar} alt={rec.from.name}
                                            style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #E2E8F0" }}
                                        />
                                        <span style={{ fontSize: 11, color: "#94A3B8" }}>De</span>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: "#334155", textAlign: "center" }}>
                                            {rec.from.name.split(" ")[0]}
                                        </span>
                                    </div>

                                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div style={{ height: 1, width: 30, background: "#E2E8F0" }} />
                                            <Heart size={20} color="#EF4444" fill="#EF4444" />
                                            <div style={{ height: 1, width: 30, background: "#E2E8F0" }} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                        <img src={rec.to.avatar} alt={rec.to.name}
                                            style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #F59E0B" }}
                                        />
                                        <span style={{ fontSize: 11, color: "#94A3B8" }}>Para</span>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: "#334155", textAlign: "center" }}>
                                            {rec.to.name.split(" ")[0]}
                                        </span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div style={{
                                    padding: "14px",
                                    background: "#F8FAFC",
                                    borderRadius: 12,
                                    border: "1px solid #E2E8F0",
                                    marginBottom: 12,
                                }}>
                                    <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                                        "{rec.message}"
                                    </p>
                                </div>

                                <div style={{ fontSize: 11, color: "#94A3B8" }}>
                                    {rec.timestamp}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Top recognized */}
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #E2E8F0",
                            padding: "18px",
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 14 }}>
                                🥇 Mais reconhecidos este mês
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {topRecognized.map((user, i) => (
                                    <div key={user.id} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "8px 10px",
                                        borderRadius: 10,
                                        background: i === 0 ? "rgba(245,158,11,0.06)" : "transparent",
                                    }}>
                                        <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>
                                            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                                        </span>
                                        <img src={user.avatar} alt={user.name}
                                            style={{ width: 34, height: 34, borderRadius: "50%" }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                                                {user.name.split(" ").slice(0, 2).join(" ")}
                                            </div>
                                            <div style={{ fontSize: 11, color: "#94A3B8" }}>{user.department}</div>
                                        </div>
                                        <span style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: "#F59E0B",
                                        }}>
                                            {user.recognitions} ⭐
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badges */}
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #E2E8F0",
                            padding: "18px",
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 14 }}>
                                🎖️ Tipos de reconhecimento
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {badges.map(badge => (
                                    <div key={badge.id} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "8px 12px",
                                        borderRadius: 10,
                                        background: badge.bg,
                                        cursor: "pointer",
                                    }}>
                                        <span style={{ fontSize: 14 }}>{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
