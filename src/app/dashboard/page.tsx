"use client";
import Topbar from "@/components/Topbar";
import { stats, departments } from "@/lib/data";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

const productivityData = [
    { name: 'Seg', valor: 65 },
    { name: 'Ter', valor: 75 },
    { name: 'Qua', valor: 85 },
    { name: 'Qui', valor: 82 },
    { name: 'Sex', valor: 90 },
];

const taskData = [
    { name: 'A fazer', value: 45, color: '#94A3B8' },
    { name: 'Em progresso', value: 30, color: '#3B82F6' },
    { name: 'Em revisão', value: 15, color: '#F59E0B' },
    { name: 'Concluído', value: 60, color: '#10B981' },
];

const departmentData = departments.slice(0, 5).map(d => ({
    name: d.name.substring(0, 3).toUpperCase(),
    projetos: d.activeProjects,
    membros: d.memberCount
}));

export default function DashboardPage() {
    return (
        <>
            <Topbar title="Dashboard Executivo" subtitle="Visão global da performance corporativa" />
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Top KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {[
                        { label: "Produtividade Geral", value: `${stats.avgProductivity}%`, trend: "+5.2%", color: "#10B981" },
                        { label: "Projetos Ativos", value: stats.activeProjects, trend: "+2", color: "#3B82F6" },
                        { label: "Tarefas Concluídas (Mês)", value: 489, trend: "+12.5%", color: "#8B5CF6" },
                        { label: "Ideias Implementadas", value: 14, trend: "Estável", color: "#F59E0B" },
                    ].map((kpi, i) => (
                        <div key={i} style={{
                            background: "white", padding: "20px", borderRadius: "16px",
                            border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                        }}>
                            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 8, fontWeight: 500 }}>{kpi.label}</div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{kpi.value}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: kpi.color, marginBottom: 3 }}>{kpi.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                    {/* Main Chart */}
                    <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Produtividade Semanal (%)</h3>
                        <div style={{ height: 300, width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={productivityData}>
                                    <defs>
                                        <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dx={-10} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="valor" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorValor)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Status das Tarefas</h3>
                        <div style={{ height: 220, width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={taskData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                                        paddingAngle={5} dataKey="value" stroke="none"
                                    >
                                        {taskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 16 }}>
                            {taskData.map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                                    <div style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Charts */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
                    {/* Bar Chart Departments */}
                    <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Projetos e Recursos por Departamento</h3>
                        </div>
                        <div style={{ height: 260, width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={departmentData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                    <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="projetos" name="Projetos" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={32} />
                                    <Bar dataKey="membros" name="Membros" fill="#93C5FD" radius={[4, 4, 0, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
