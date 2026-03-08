"use client";
import Topbar from "@/components/Topbar";
import PostCard from "@/components/PostCard";
import {
  posts,
  currentUser,
  stats,
  events,
  tasks,
  recognitions,
} from "@/lib/data";
import {
  Users,
  FolderOpen,
  CheckSquare,
  Lightbulb,
  Calendar,
  Award,
  TrendingUp,
  ChevronRight,
  Image,
  Smile,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const statCards = [
  {
    label: "Colaboradores",
    value: stats.totalCollaborators,
    icon: Users,
    color: "#111827",
    bg: "rgba(17,24,39,0.08)",
    suffix: "",
  },
  {
    label: "Projectos Activos",
    value: stats.activeProjects,
    icon: FolderOpen,
    color: "#4B5563",
    bg: "rgba(75,85,99,0.08)",
    suffix: "",
  },
  {
    label: "Tarefas esta semana",
    value: stats.tasksCompletedThisWeek,
    icon: CheckSquare,
    color: "#4B5563",
    bg: "rgba(16,185,129,0.08)",
    suffix: "",
  },
  {
    label: "Produtividade",
    value: stats.avgProductivity,
    icon: TrendingUp,
    color: "#6B7280",
    bg: "rgba(245,158,11,0.08)",
    suffix: "%",
  },
];

const eventTypeColors: Record<string, { bg: string; color: string }> = {
  meeting: { bg: "rgba(17,24,39,0.1)", color: "#111827" },
  training: { bg: "rgba(75,85,99,0.1)", color: "#4B5563" },
  event: { bg: "rgba(75,85,99,0.1)", color: "#4B5563" },
  deadline: { bg: "rgba(107,114,128,0.1)", color: "#6B7280" },
};

export default function HomePage() {
  const [postText, setPostText] = useState("");
  const [feedFilter, setFeedFilter] = useState("all");

  const filters = [
    { id: "all", label: "Tudo" },
    { id: "announcement", label: "Comunicados" },
    { id: "achievement", label: "Conquistas" },
    { id: "idea", label: "Ideias" },
  ];

  const filteredPosts =
    feedFilter === "all"
      ? posts
      : posts.filter((p) => p.type === feedFilter);

  const todayTasks = tasks.filter(
    (t) => t.status !== "done" && t.status !== "todo"
  ).slice(0, 3);

  return (
    <>
      <Topbar
        title="Feed Corporativo"
        subtitle="Acompanha as novidades da empresa"
      />

      <div
        style={{
          padding: "24px 28px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            {statCards.map((card) => (
              <div
                key={card.label}
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "16px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                className="card-hover"
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <card.icon size={20} color={card.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                    {card.suffix}
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3 }}>
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "2px solid #E2E8F0",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={`O que tens a partilhar, ${currentUser.name.split(" ")[0]}?`}
                  style={{
                    width: "100%",
                    minHeight: 80,
                    padding: "10px 0",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    fontSize: 14,
                    color: "#334155",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.6,
                    background: "transparent",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingTop: 12,
                    borderTop: "1px solid #F1F5F9",
                    marginTop: 8,
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: "#F8FAFC",
                      color: "#64748B",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <Image size={15} color="#64748B" />
                    Imagem
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: "#F8FAFC",
                      color: "#64748B",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <Smile size={15} color="#64748B" />
                    Reação
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: "#F8FAFC",
                      color: "#64748B",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <MapPin size={15} color="#64748B" />
                    Localização
                  </button>
                  <button
                    className="btn-primary"
                    style={{
                      marginLeft: "auto",
                      fontSize: 13,
                      padding: "8px 20px",
                    }}
                    disabled={!postText.trim()}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Filters */}
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFeedFilter(f.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "1.5px solid",
                  borderColor: feedFilter === f.id ? "#111827" : "#E2E8F0",
                  background: feedFilter === f.id ? "#EFF6FF" : "white",
                  color: feedFilter === f.id ? "#111827" : "#64748B",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Welcome Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #111827 0%, #4B5563 100%)",
              borderRadius: 16,
              padding: "20px",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -30,
                right: 20,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.3)",
                }}
              />
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>
                  Bom dia! 👋
                </div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {currentUser.name.split(" ")[0]}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>
              {currentUser.role} · {currentUser.department}
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  {currentUser.completedTasks}
                </div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Tarefas</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  {currentUser.recognitions}
                </div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Reconhecimentos</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>3</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Projectos</div>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div
                style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}
              >
                ✅ As minhas tarefas
              </div>
              <a
                href="/tarefas"
                style={{
                  fontSize: 12,
                  color: "#111827",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                Ver tudo <ChevronRight size={14} />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "10px",
                    borderRadius: 10,
                    background: "#F8FAFC",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        task.priority === "urgent"
                          ? "#4B5563"
                          : task.priority === "high"
                            ? "#6B7280"
                            : task.priority === "medium"
                              ? "#6B7280"
                              : "#4B5563",
                      flexShrink: 0,
                      marginTop: 5,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3 }}>
                      {task.progress}% concluído · {task.department}
                    </div>
                    <div className="progress-bar" style={{ marginTop: 6 }}>
                      <div
                        className="progress-fill"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>
                📅 Próximos eventos
              </div>
              <a
                href="/agenda"
                style={{
                  fontSize: 12,
                  color: "#111827",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                Ver tudo <ChevronRight size={14} />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {events.slice(0, 4).map((event) => {
                const typeStyle = eventTypeColors[event.type];
                return (
                  <div
                    key={event.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px",
                      borderRadius: 10,
                      background: "#F8FAFC",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: typeStyle.bg,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: typeStyle.color,
                          lineHeight: 1,
                        }}
                      >
                        {new Date(event.date).getDate()}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: typeStyle.color,
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {new Date(event.date).toLocaleDateString("pt-PT", {
                          month: "short",
                        })}
                      </div>
                    </div>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0F172A",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                        {event.time} · {event.department}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Latest Recognitions */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>
                🏆 Reconhecimentos
              </div>
              <a
                href="/reconhecimento"
                style={{
                  fontSize: 12,
                  color: "#111827",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                Ver tudo <ChevronRight size={14} />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recognitions.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  style={{
                    padding: "12px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(107,114,128,0.04), rgba(239,68,68,0.04))",
                    border: "1px solid rgba(245,158,11,0.12)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <img
                      src={rec.from.avatar}
                      alt={rec.from.name}
                      style={{ width: 28, height: 28, borderRadius: "50%" }}
                    />
                    <div style={{ fontSize: 11, color: "#64748B" }}>
                      <strong style={{ color: "#0F172A" }}>
                        {rec.from.name.split(" ")[0]}
                      </strong>{" "}
                      reconheceu{" "}
                      <strong style={{ color: "#0F172A" }}>
                        {rec.to.name.split(" ")[0]}
                      </strong>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "4px 10px",
                      background: "rgba(107,114,128,0.1)",
                      color: "#D97706",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: 8,
                    }}
                  >
                    {rec.badge}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    "{rec.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
