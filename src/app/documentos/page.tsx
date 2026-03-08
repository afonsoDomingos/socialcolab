"use client";
import Topbar from "@/components/Topbar";
import { departments } from "@/lib/data";
import { useState } from "react";
import {
    FileText, Search, Folder, MoreVertical, Download, Lock, Users, UploadCloud
} from "lucide-react";

// Mock documents since they weren't in data.ts
const mockDocs = [
    { id: "d1", name: "Manual de Acolhimento 2026.pdf", type: "pdf", size: "2.4 MB", dept: "RH", date: "12 Mar 2026", auth: "public" },
    { id: "d2", name: "Relatório Financeiro Q4.xlsx", type: "excel", size: "4.1 MB", dept: "Finanças", date: "05 Mar 2026", auth: "confidential" },
    { id: "d3", name: "Brand Guidelines v3.pdf", type: "pdf", size: "12.8 MB", dept: "Marketing", date: "18 Fev 2026", auth: "public" },
    { id: "d4", name: "Apresentação de Vendas - Novo Serviço.pptx", type: "powerpoint", size: "8.5 MB", dept: "Vendas", date: "15 Fev 2026", auth: "internal" },
    { id: "d5", name: "Arquitetura do Sistema Core.docx", type: "word", size: "1.2 MB", dept: "TI", date: "10 Fev 2026", auth: "internal" },
    { id: "d6", name: "Processos Operacionais Standard.pdf", type: "pdf", size: "3.7 MB", dept: "Operações", date: "02 Fev 2026", auth: "internal" },
];

const getIconColor = (type: string) => {
    switch (type) {
        case 'pdf': return '#EF4444';
        case 'excel': return '#10B981';
        case 'word': return '#2563EB';
        case 'powerpoint': return '#F59E0B';
        default: return '#64748B';
    }
};

const getAuthBadge = (auth: string) => {
    switch (auth) {
        case 'public': return { label: 'Público', color: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: Users };
        case 'internal': return { label: 'Interno', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', icon: Folder };
        case 'confidential': return { label: 'Confidencial', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', icon: Lock };
        default: return { label: auth, color: '#64748B', bg: '#F1F5F9', icon: Folder };
    }
};

export default function DocumentosPage() {
    const [filter, setFilter] = useState("Todos");
    const [search, setSearch] = useState("");

    const filtered = mockDocs.filter(d =>
        (filter === "Todos" || d.dept === filter) &&
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Topbar title="Documentos Corporativos" subtitle="Repositório central de conhecimento" />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Action Bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <div style={{ display: "flex", gap: 12, flex: 1 }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 8, background: "white",
                            border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "8px 16px", flex: 1, maxWidth: 400
                        }}>
                            <Search size={16} color="#94A3B8" />
                            <input
                                placeholder="Pesquisar documentos..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                style={{ border: "none", outline: "none", width: "100%", fontSize: 14, color: "#334155" }}
                            />
                        </div>
                    </div>
                    <button style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                        borderRadius: 10, border: "none", background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                        color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
                    }}>
                        <UploadCloud size={16} />
                        Novo Upload
                    </button>
                </div>

                {/* Folders */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
                    {departments.slice(0, 5).map(dept => (
                        <div
                            key={dept.id}
                            onClick={() => setFilter(filter === dept.name ? "Todos" : dept.name)}
                            style={{
                                background: filter === dept.name ? "rgba(37,99,235,0.05)" : "white",
                                borderRadius: 16, border: "1px solid",
                                borderColor: filter === dept.name ? "#2563EB" : "#E2E8F0",
                                padding: "20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                            className="card-hover"
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: 12, background: dept.bgColor,
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <Folder size={20} color={dept.color} fill={dept.color} fillOpacity={0.2} />
                            </div>
                            <div style={{ overflow: "hidden" }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {dept.name}
                                </div>
                                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Pasta Partilhada</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Files List */}
                <div style={{ background: "white", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>

                    <div style={{
                        display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1.5fr auto", gap: 16,
                        padding: "16px 24px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0",
                        fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>
                        <div>Nome do Ficheiro</div>
                        <div>Tamanho</div>
                        <div>Departamento</div>
                        <div>Permissão</div>
                        <div style={{ width: 24 }}></div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {filtered.map((doc, idx) => {
                            const authInfo = getAuthBadge(doc.auth);
                            const AuthIcon = authInfo.icon;
                            return (
                                <div key={doc.id} style={{
                                    display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1.5fr auto", gap: 16,
                                    padding: "16px 24px", borderBottom: idx === filtered.length - 1 ? "none" : "1px solid #F1F5F9",
                                    alignItems: "center", transition: "background 0.2s", cursor: "pointer"
                                }} className="hover:bg-slate-50">

                                    {/* Name */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: 8, background: `${getIconColor(doc.type)}15`,
                                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                        }}>
                                            <FileText size={18} color={getIconColor(doc.type)} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {doc.name}
                                            </div>
                                            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Adicionado a {doc.date}</div>
                                        </div>
                                    </div>

                                    {/* Size */}
                                    <div style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>
                                        {doc.size}
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <span style={{ padding: "4px 10px", borderRadius: 20, background: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 600 }}>
                                            {doc.dept}
                                        </span>
                                    </div>

                                    {/* Auth */}
                                    <div>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", gap: 4,
                                            padding: "4px 10px", borderRadius: 20, background: authInfo.bg, color: authInfo.color,
                                            fontSize: 11, fontWeight: 600
                                        }}>
                                            <AuthIcon size={12} />
                                            {authInfo.label}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button style={{
                                            width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent",
                                            color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                                        }} aria-label="Download">
                                            <Download size={16} />
                                        </button>
                                        <button style={{
                                            width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent",
                                            color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                                        }}>
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                        {filtered.length === 0 && (
                            <div style={{ padding: "48px 24px", textAlign: "center", color: "#94A3B8" }}>
                                <Folder size={48} color="#CBD5E1" style={{ margin: "0 auto 16px" }} />
                                <div style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 4 }}>Nenhum documento encontrado</div>
                                <div style={{ fontSize: 13 }}>Tenta procurar com outros termos ou mudar de pasta.</div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
