"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  MessageSquareShare,
  Workflow,
  Inbox,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  Activity,
  Bot
} from "lucide-react";
import gsap from "gsap";

interface SidebarProps {
  onSelectFeature?: (featureId: string) => void;
}

export default function Sidebar({ onSelectFeature }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("triggers");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: "Live" },
    { id: "triggers", label: "Comment-to-DM", icon: MessageSquareShare, badge: "98% Auto" },
    { id: "flows", label: "Smart DM Funnels", icon: Workflow, badge: "AI" },
    { id: "inbox", label: "Unified IG Inbox", icon: Inbox, count: 12 },
    { id: "crm", label: "Lead Contacts", icon: Users, count: "1.4k" },
    { id: "analytics", label: "Conversion ROI", icon: BarChart3 },
    { id: "ai-settings", label: "AI Tone & Rules", icon: Bot },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    if (sidebarRef.current) {
      // Subtle professional slide-in with GSAP
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  const handleToggle = () => {
    const nextState = !collapsed;
    setCollapsed(nextState);

    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        width: nextState ? "80px" : "260px",
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (onSelectFeature) {
      onSelectFeature(id);
    }
    // Micro GSAP pulse on the clicked element
    const el = document.getElementById(`sidebar-item-${id}`);
    if (el) {
      gsap.fromTo(
        el,
        { scale: 0.94 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  };

  return (
    <aside
      ref={sidebarRef}
      id="main-sidebar"
      className="hidden xl:flex fixed left-6 top-28 z-40 flex-col rounded-2xl glass-panel shadow-2xl shadow-black/50 border border-white/[0.08] transition-all duration-300 w-[260px] max-h-[calc(100vh-140px)] overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0064e0] to-[#6366f1] flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white truncate">AutoPilot Engine</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Automation
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleToggle}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {!collapsed ? "Automation Workspace" : "•••"}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                id={`sidebar-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#0064e0]/25 via-[#6366f1]/20 to-transparent text-white border border-[#0095f6]/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#0095f6] text-white shadow-md shadow-[#0095f6]/30"
                      : "bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {!collapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#6366f1]/20 text-indigo-300 border border-[#6366f1]/30">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>

              {/* Tooltip for collapsed view */}
              {collapsed && hoveredItem === item.id && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-medium border border-white/10 shadow-xl whitespace-nowrap pointer-events-none">
                  {item.label}
                  {item.badge && <span className="ml-1 text-indigo-400">({item.badge})</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mini Performance Widget in Sidebar */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-gradient-to-br from-[#0095f6]/10 via-[#6366f1]/10 to-transparent border border-[#0095f6]/20">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-[#0095f6]" />
              Response Speed
            </span>
            <span className="font-bold text-white">1.2 sec</span>
          </div>
          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#0095f6] to-[#f59e0b] h-full w-[94%] rounded-full animate-pulse" />
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>24h Triggers: 4,819</span>
            <span className="text-emerald-400 font-semibold">+99.4% Delivery</span>
          </div>
        </div>
      )}

      {/* Meta API Safety Footer */}
      <div className="p-3 border-t border-white/[0.06] bg-black/30">
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <Shield className="w-3.5 h-3.5 text-[#0095f6] shrink-0" />
          {!collapsed && <span className="truncate">Official Meta Graph API v20.0</span>}
        </div>
      </div>
    </aside>
  );
}
