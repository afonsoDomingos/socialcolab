"use client";
import Topbar from "@/components/Topbar";
import { events } from "@/lib/data";
import { useState } from "react";
import { Plus, Search, MapPin, Clock, Users, Video } from "lucide-react";

const typeColors: Record<string, { bg: string; color: string; label: string }> = {
    meeting: { bg: "rgba(17,24,39,0.1)", color: "#111827", label: "Reunião" },
    training: { bg: "rgba(75,85,99,0.1)", color: "#4B5563", label: "Formação" },
    event: { bg: "rgba(75,85,99,0.1)", color: "#4B5563", label: "Evento" },
    deadline: { bg: "rgba(107,114,128,0.1)", color: "#6B7280", label: "Prazo" },
};

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Simplified calendar generation (just numbers for demo)
const daysInMonth = 31;
const startDay = 2; // e.g Tuesday
const today = 8; // Match mock data

export default function AgendaPage() {
    const [currentMonth] = useState("Março 2026");

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} style={{ padding: 10, background: "transparent" }} />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today;
            const dayEvents = events.filter(e => {
                const d = new Date(e.date);
                return d.getDate() === day;
            });

            days.push(
                <div key={`day-${day}`} style={{
                    minHeight: 100, padding: "8px 12px", background: "white",
                    border: "1px solid #F1F5F9", borderRadius: 8,
                    display: "flex", flexDirection: "column", gap: 4
                }}>
                    <div style={{
                        fontSize: 13, fontWeight: isToday ? 800 : 500,
                        color: isToday ? "white" : "#475569",
                        background: isToday ? "#111827" : "transparent",
                        width: 24, height: 24, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        alignSelf: "flex-end"
                    }}>
                        {day}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                        {dayEvents.map(e => {
                            const style = typeColors[e.type];
                            return (
                                <div key={e.id} style={{
                                    padding: "4px 6px", borderRadius: 4, background: style.bg,
                                    color: style.color, fontSize: 10, fontWeight: 600,
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    cursor: "pointer"
                                }} title={e.title}>
                                    {e.title}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <>
            <Topbar title="Agenda" subtitle="Calendário corporativo de eventos e reuniões" />
            <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>

                {/* Calendar View */}
                <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                                {currentMonth}
                            </h2>
                            <div style={{ display: "flex", gap: 4 }}>
                                <button style={{
                                    width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0",
                                    background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer"
                                }}>{"<"}</button>
                                <button style={{
                                    width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0",
                                    background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer"
                                }}>{">"}</button>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button style={{
                                padding: "8px 16px", borderRadius: 10, border: "1.5px solid #111827",
                                background: "white", color: "#111827", fontSize: 13, fontWeight: 600, cursor: "pointer"
                            }}>
                                Hoje
                            </button>
                            <button
                                style={{
                                    display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                                    borderRadius: 10, border: "none", background: "linear-gradient(135deg, #111827, #4B5563)",
                                    color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(17,24,39,0.3)",
                                }}
                            >
                                <Plus size={16} />
                                Novo evento
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 8 }}>
                        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
                            <div key={d} style={{ textAlign: "right", paddingRight: 10, fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>
                                {d}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                        {renderCalendarDays()}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Legend */}
                    <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 16px" }}>Tipos de Evento</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {Object.values(typeColors).map((type, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 14, height: 14, borderRadius: 4, background: type.bg, border: `1.5px solid ${type.color}` }} />
                                    <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>{type.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming List */}
                    <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 16px" }}>Próximos esta semana</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {events.slice(0, 4).map(event => {
                                const typeStyle = typeColors[event.type];
                                return (
                                    <div key={event.id} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 10, background: typeStyle.bg,
                                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0
                                        }}>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: typeStyle.color, lineHeight: 1 }}>
                                                {new Date(event.date).getDate()}
                                            </div>
                                            <div style={{ fontSize: 9, color: typeStyle.color, fontWeight: 600, textTransform: "uppercase", marginTop: 2 }}>
                                                {monthNames[new Date(event.date).getMonth()].substring(0, 3)}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, overflow: "hidden" }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", lineHeight: 1.3, marginBottom: 4 }}>
                                                {event.title}
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#64748B", marginBottom: 3 }}>
                                                <Clock size={12} /> {event.time}
                                            </div>
                                            {event.type === "meeting" && (
                                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#64748B" }}>
                                                    <Video size={12} /> Reunião Online
                                                </div>
                                            )}
                                        </div>
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
