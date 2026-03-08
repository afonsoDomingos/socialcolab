"use client";
import Topbar from "@/components/Topbar";
import { ideas } from "@/lib/data";
import { useState } from "react";
import { ThumbsUp, MessageCircle, Plus, Lightbulb, CheckCircle, Clock, Star } from "lucide-react";

const statusConfig = {
    submitted: { label: "Submetida", color: "#94A3B8", bg: "#F1F5F9", icon: "📥" },
    review: { label: "Em análise", color: "#6B7280", bg: "rgba(107,114,128,0.1)", icon: "🔍" },
    approved: { label: "Aprovada", color: "#111827", bg: "rgba(17,24,39,0.1)", icon: "✅" },
    implemented: { label: "Implementada", color: "#4B5563", bg: "rgba(75,85,99,0.1)", icon: "🚀" },
};

const categories = ["Todas", "Produto", "Processo", "Cultura", "Tecnologia", "Cliente"];

export default function IdeiasPage() {
    const [filter, setFilter] = useState("Todas");
    const [votedIdeas, setVotedIdeas] = useState<Record<string, boolean>>(
        Object.fromEntries(ideas.map(i => [i.id, i.voted]))
    );
    const [votes, setVotes] = useState<Record<string, number>>(
        Object.fromEntries(ideas.map(i => [i.id, i.votes]))
    );

    const filtered = filter === "Todas" ? ideas : ideas.filter(i => i.category === filter);

    const toggleVote = (id: string) => {
        const isVoted = votedIdeas[id];
        setVotedIdeas(prev => ({ ...prev, [id]: !isVoted }));
        setVotes(prev => ({ ...prev, [id]: isVoted ? prev[id] - 1 : prev[id] + 1 }));
    };

    const implemented = ideas.filter(i => i.status === "implemented").length;
    const approved = ideas.filter(i => i.status === "approved").length;
    const total = ideas.length;

    return (
        <>
            <Topbar title="Ideias & Inovação" subtitle="Transforma ideias em realidade" />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Hero */}
                <div style={{
                    background: "linear-gradient(135deg, #4B5563 0%, #111827 100%)",
                    borderRadius: 20,
                    padding: "28px 32px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", top: -40, right: -40,
                        width: 200, height: 200, borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                    }} />
                    <div style={{
                        position: "absolute", bottom: -60, left: "40%",
                        width: 150, height: 150, borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                    }} />
                    <div>
                        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>✨ Portal de Inovação</div>
                        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
                            A tua ideia pode mudar a empresa
                        </h2>
                        <p style={{ fontSize: 14, opacity: 0.8, maxWidth: 440, lineHeight: 1.6 }}>
                            Submete ideias, vota nas dos teus colegas e acompanha a sua implementação.
                            Cada grande mudança começa com uma simples ideia.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 32, flexShrink: 0 }}>
                        {[
                            { v: total, label: "Ideias submetidas", icon: "💡" },
                            { v: approved, label: "Aprovadas", icon: "✅" },
                            { v: implemented, label: "Implementadas", icon: "🚀" },
                        ].map(({ v, label, icon }) => (
                            <div key={label} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 12, marginBottom: 4 }}>{icon}</div>
                                <div style={{ fontSize: 28, fontWeight: 800 }}>{v}</div>
                                <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
                    {/* Ideas list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Controls */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        style={{
                                            padding: "7px 14px",
                                            borderRadius: 8,
                                            border: "1.5px solid",
                                            borderColor: filter === cat ? "#4B5563" : "#E2E8F0",
                                            background: filter === cat ? "rgba(75,85,99,0.08)" : "white",
                                            color: filter === cat ? "#4B5563" : "#64748B",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <button style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "9px 18px",
                                borderRadius: 10,
                                border: "none",
                                background: "linear-gradient(135deg, #4B5563, #111827)",
                                color: "white",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                            }}>
                                <Plus size={16} />
                                Submeter ideia
                            </button>
                        </div>

                        {/* Ideas */}
                        {filtered.map(idea => {
                            const status = statusConfig[idea.status];
                            return (
                                <div key={idea.id} style={{
                                    background: "white",
                                    borderRadius: 16,
                                    border: "1px solid #E2E8F0",
                                    padding: "20px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    gap: 16,
                                    cursor: "pointer",
                                }} className="card-hover">
                                    {/* Vote button */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                                        <button
                                            onClick={e => { e.stopPropagation(); toggleVote(idea.id); }}
                                            style={{
                                                width: 48,
                                                height: 52,
                                                borderRadius: 12,
                                                border: "1.5px solid",
                                                borderColor: votedIdeas[idea.id] ? "#4B5563" : "#E2E8F0",
                                                background: votedIdeas[idea.id] ? "rgba(75,85,99,0.08)" : "white",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 2,
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <ThumbsUp
                                                size={16}
                                                color={votedIdeas[idea.id] ? "#4B5563" : "#94A3B8"}
                                                fill={votedIdeas[idea.id] ? "#4B5563" : "none"}
                                            />
                                            <span style={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: votedIdeas[idea.id] ? "#4B5563" : "#64748B",
                                            }}>
                                                {votes[idea.id]}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", lineHeight: 1.3 }}>
                                                {idea.title}
                                            </h3>
                                            <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                                                <span style={{
                                                    padding: "4px 10px",
                                                    borderRadius: 20,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    background: "#F1F5F9",
                                                    color: "#64748B",
                                                }}>
                                                    {idea.category}
                                                </span>
                                                <span style={{
                                                    padding: "4px 10px",
                                                    borderRadius: 20,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    background: status.bg,
                                                    color: status.color,
                                                }}>
                                                    {status.icon} {status.label}
                                                </span>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 12 }}>
                                            {idea.description}
                                        </p>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <img
                                                src={idea.author.avatar}
                                                alt={idea.author.name}
                                                style={{ width: 24, height: 24, borderRadius: "50%" }}
                                            />
                                            <span style={{ fontSize: 12, color: "#94A3B8" }}>
                                                {idea.author.name} · {idea.timestamp}
                                            </span>
                                            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#94A3B8" }}>
                                                <MessageCircle size={13} />
                                                {idea.comments} comentários
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Top ideas */}
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #E2E8F0",
                            padding: "18px",
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 14 }}>
                                🔥 Mais votadas
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[...ideas]
                                    .sort((a, b) => b.votes - a.votes)
                                    .slice(0, 4)
                                    .map((idea, i) => (
                                        <div key={idea.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <span style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 6,
                                                background: i === 0 ? "#6B7280" : i === 1 ? "#94A3B8" : "#CD7F32",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: "white",
                                                flexShrink: 0,
                                            }}>
                                                {i + 1}
                                            </span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", lineHeight: 1.3 }}>
                                                    {idea.title}
                                                </div>
                                                <div style={{ fontSize: 11, color: "#94A3B8" }}>{idea.votes} votos</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #E2E8F0",
                            padding: "18px",
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 14 }}>
                                📂 Por categoria
                            </div>
                            {["Produto", "Processo", "Cultura", "Tecnologia", "Cliente"].map(cat => {
                                const count = ideas.filter(i => i.category === cat).length;
                                return (
                                    <div key={cat} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "8px 0",
                                        borderBottom: "1px solid #F8FAFC",
                                    }}>
                                        <span style={{ fontSize: 13, color: "#334155" }}>{cat}</span>
                                        <span style={{
                                            padding: "2px 8px",
                                            borderRadius: 20,
                                            background: "#EFF6FF",
                                            color: "#111827",
                                            fontSize: 11,
                                            fontWeight: 700,
                                        }}>
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
