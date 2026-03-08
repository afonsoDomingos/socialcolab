"use client";
import Topbar from "@/components/Topbar";
import { useUI } from "@/components/AppLayout";
import { posts, users, tasks, ideas } from "@/lib/data";
import PostCard from "@/components/PostCard";
import TaskCard from "@/components/TaskCard";
import { Search } from "lucide-react";

export default function PesquisaPage() {
    const { searchQuery } = useUI();
    const lowerQuery = searchQuery.toLowerCase();

    const foundPosts = posts.filter(p => p.content.toLowerCase().includes(lowerQuery) || p.tags.some(t => t.toLowerCase().includes(lowerQuery)));
    const foundUsers = users.filter(u => u.name.toLowerCase().includes(lowerQuery) || u.department.toLowerCase().includes(lowerQuery));
    const foundTasks = tasks.filter(t => t.title.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery));
    const foundIdeas = ideas.filter(i => i.title.toLowerCase().includes(lowerQuery) || i.description.toLowerCase().includes(lowerQuery));

    return (
        <>
            <Topbar title="Resultados da Pesquisa" subtitle={`A procurar por: "${searchQuery}"`} />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 32 }}>

                {!searchQuery ? (
                    <div className="empty-state">
                        <Search size={48} color="#CBD5E1" />
                        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#475569" }}>Começa a digitar para pesquisar</h2>
                        <p>Os resultados de posts, utilizadores, tarefas e ideias aparecerão aqui.</p>
                    </div>
                ) : (
                    <>
                        {/* Utilize */}
                        {foundUsers.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Pessoas ({foundUsers.length})</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                                    {foundUsers.map(u => (
                                        <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", padding: 16, borderRadius: 12, border: "1px solid #E2E8F0" }}>
                                            <img src={u.avatar} alt={u.name} style={{ width: 44, height: 44, borderRadius: "50%" }} />
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                                                <div style={{ fontSize: 12, color: "#64748B" }}>{u.role} · {u.department}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Posts */}
                        {foundPosts.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Publicações ({foundPosts.length})</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {foundPosts.map(p => <PostCard key={p.id} post={p} />)}
                                </div>
                            </div>
                        )}

                        {/* Tarefas */}
                        {foundTasks.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Tarefas ({foundTasks.length})</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                                    {foundTasks.map(t => <TaskCard key={t.id} task={t} />)}
                                </div>
                            </div>
                        )}

                        {/* Ideias */}
                        {foundIdeas.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ideias ({foundIdeas.length})</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {foundIdeas.map(idea => (
                                        <div key={idea.id} style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #E2E8F0" }}>
                                            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{idea.title}</div>
                                            <div style={{ fontSize: 13, color: "#64748B" }}>{idea.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {foundPosts.length === 0 && foundUsers.length === 0 && foundTasks.length === 0 && foundIdeas.length === 0 && (
                            <div className="empty-state">
                                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#475569" }}>Sem resultados</h2>
                                <p>Não encontrámos nada a corresponder a "{searchQuery}". Tenta outros termos de pesquisa.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
