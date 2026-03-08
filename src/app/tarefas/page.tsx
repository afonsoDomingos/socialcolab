"use client";
import Topbar from "@/components/Topbar";
import { tasks } from "@/lib/data";
import { useState } from "react";
import {
    Plus, Filter, LayoutGrid, List,
    Clock, CheckCircle2, Eye, AlertCircle
} from "lucide-react";
import TaskCard from "@/components/TaskCard";

const columns = [
    { id: "todo", label: "A fazer", icon: Clock, color: "#94A3B8", count: 0 },
    { id: "inprogress", label: "Em progresso", icon: AlertCircle, color: "#111827", count: 0 },
    { id: "review", label: "Em revisão", icon: Eye, color: "#6B7280", count: 0 },
    { id: "done", label: "Concluído", icon: CheckCircle2, color: "#4B5563", count: 0 },
];

export default function TarefasPage() {
    const [view, setView] = useState<"kanban" | "list">("kanban");
    const [filter, setFilter] = useState("all");

    const departments = ["all", "Marketing", "TI", "RH", "Vendas", "Operações", "Finanças"];

    const filtered = filter === "all" ? tasks : tasks.filter(t => t.department === filter);

    return (
        <>
            <Topbar title="Gestão de Tarefas" subtitle={`${tasks.length} tarefas no total`} />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    {/* Department filter */}
                    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                        {departments.map(d => (
                            <button
                                key={d}
                                onClick={() => setFilter(d)}
                                style={{
                                    padding: "7px 14px",
                                    borderRadius: 8,
                                    border: "1.5px solid",
                                    borderColor: filter === d ? "#111827" : "#E2E8F0",
                                    background: filter === d ? "#EFF6FF" : "white",
                                    color: filter === d ? "#111827" : "#64748B",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.15s",
                                }}
                            >
                                {d === "all" ? "Todos" : d}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        {/* View toggle */}
                        <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3 }}>
                            {[{ v: "kanban", icon: LayoutGrid }, { v: "list", icon: List }].map(({ v, icon: Icon }) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v as "kanban" | "list")}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: 8,
                                        border: "none",
                                        background: view === v ? "white" : "transparent",
                                        color: view === v ? "#111827" : "#94A3B8",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>

                        <button className="btn-primary" style={{ fontSize: 13 }}>
                            <Plus size={16} />
                            Nova Tarefa
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {columns.map(col => {
                        const colTasks = filtered.filter(t => t.status === col.id);
                        return (
                            <div key={col.id} style={{
                                background: "white",
                                borderRadius: 12,
                                padding: "14px 16px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background: `${col.color}15`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <col.icon size={18} color={col.color} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>
                                        {colTasks.length}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{col.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Kanban View */}
                {view === "kanban" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, minHeight: 400 }}>
                        {columns.map(col => {
                            const colTasks = filtered.filter(t => t.status === col.id);
                            return (
                                <div key={col.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {/* Column header */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "10px 14px",
                                        background: "white",
                                        borderRadius: 12,
                                        border: "1px solid #E2E8F0",
                                        borderTop: `3px solid ${col.color}`,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <col.icon size={16} color={col.color} />
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
                                                {col.label}
                                            </span>
                                        </div>
                                        <span style={{
                                            minWidth: 22,
                                            height: 22,
                                            borderRadius: 6,
                                            background: `${col.color}15`,
                                            color: col.color,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0 6px",
                                        }}>
                                            {colTasks.length}
                                        </span>
                                    </div>

                                    {/* Tasks */}
                                    {colTasks.length === 0 ? (
                                        <div className="empty-state" style={{ padding: 24, background: "white", borderRadius: 12, border: "1.5px dashed #E2E8F0" }}>
                                            <div style={{ fontSize: 24 }}>📭</div>
                                            <span style={{ fontSize: 12 }}>Sem tarefas</span>
                                        </div>
                                    ) : (
                                        colTasks.map(task => <TaskCard key={task.id} task={task} />)
                                    )}

                                    {/* Add task button */}
                                    <button style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "10px 14px",
                                        borderRadius: 10,
                                        border: "1.5px dashed #CBD5E1",
                                        background: "transparent",
                                        color: "#94A3B8",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                    }}>
                                        <Plus size={14} />
                                        Adicionar tarefa
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* List View */}
                {view === "list" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {filtered.map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                )}
            </div>
        </>
    );
}
