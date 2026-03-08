"use client";
import { Task } from "@/lib/data";
import { Calendar, AlertCircle, Clock } from "lucide-react";

const priorityConfig = {
    low: { color: "#4B5563", bg: "rgba(75,85,99,0.1)", label: "Baixa" },
    medium: { color: "#6B7280", bg: "rgba(107,114,128,0.1)", label: "Média" },
    high: { color: "#6B7280", bg: "rgba(107,114,128,0.1)", label: "Alta" },
    urgent: { color: "#4B5563", bg: "rgba(75,85,99,0.1)", label: "Urgente" },
};

const statusConfig = {
    todo: { color: "#94A3B8", bg: "#F1F5F9", label: "A fazer" },
    inprogress: { color: "#111827", bg: "rgba(17,24,39,0.1)", label: "Em progresso" },
    review: { color: "#6B7280", bg: "rgba(107,114,128,0.1)", label: "Em revisão" },
    done: { color: "#4B5563", bg: "rgba(75,85,99,0.1)", label: "Concluído" },
};

export default function TaskCard({ task }: { task: Task }) {
    const priority = priorityConfig[task.priority];
    const status = statusConfig[task.status];

    const isOverdue =
        new Date(task.dueDate) < new Date() && task.status !== "done";

    return (
        <div
            style={{
                background: "white",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                borderLeft: `4px solid ${priority.color}`,
            }}
            className="card-hover"
        >
            {/* Top row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}
            >
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: task.status === "done" ? "#94A3B8" : "#0F172A",
                            textDecoration: task.status === "done" ? "line-through" : "none",
                            lineHeight: 1.4,
                            marginBottom: 4,
                        }}
                    >
                        {task.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.4 }}>
                        {task.description}
                    </div>
                </div>
            </div>

            {/* Progress */}
            {task.status === "inprogress" && (
                <div style={{ marginBottom: 12 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 5,
                        }}
                    >
                        <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
                            Progresso
                        </span>
                        <span
                            style={{ fontSize: 11, color: "#111827", fontWeight: 700 }}
                        >
                            {task.progress}%
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${task.progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
                <div
                    style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}
                >
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                padding: "2px 8px",
                                background: "#F1F5F9",
                                color: "#64748B",
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 500,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            border: "1.5px solid #E2E8F0",
                        }}
                    />
                    <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
                        {task.assignee.name.split(" ")[0]}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                        style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            background: priority.bg,
                            color: priority.color,
                        }}
                    >
                        {priority.label}
                    </span>

                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                            color: isOverdue ? "#6B7280" : "#94A3B8",
                            fontWeight: 500,
                        }}
                    >
                        {isOverdue ? (
                            <AlertCircle size={12} color="#6B7280" />
                        ) : (
                            <Calendar size={12} />
                        )}
                        {new Date(task.dueDate).toLocaleDateString("pt-PT", {
                            day: "2-digit",
                            month: "short",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
