"use client";
import Sidebar from "@/components/Sidebar";
import React, { createContext, useContext, useState } from "react";

interface UIContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within UIProvider");
    return context;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <UIContext.Provider value={{ sidebarOpen, toggleSidebar: () => setSidebarOpen(!sidebarOpen), searchQuery, setSearchQuery }}>
            <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
                {sidebarOpen && <Sidebar />}
                <main
                    style={{
                        flex: 1,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {children}
                </main>
            </div>
        </UIContext.Provider>
    );
}
