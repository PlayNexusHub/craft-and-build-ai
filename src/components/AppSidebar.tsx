import { useState } from "react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Sparkles,
  Plus,
  FolderOpen,
  Settings,
  Cloud,
  HardDrive,
  Zap,
  History,
  Star,
  Trash2
} from "lucide-react";

export const AppSidebar = () => {
  const [isLocalMode, setIsLocalMode] = useState(true);

  const recentProjects = [
    { id: 1, name: "Todo App", status: "completed", date: "2 hours ago" },
    { id: 2, name: "Landing Page", status: "in-progress", date: "1 day ago" },
    { id: 3, name: "Dashboard", status: "completed", date: "3 days ago" },
  ];

  const templates = [
    { name: "React App", icon: "⚛️", description: "Modern React application" },
    { name: "Landing Page", icon: "🚀", description: "Marketing landing page" },
    { name: "Dashboard", icon: "📊", description: "Admin dashboard" },
    { name: "E-commerce", icon: "🛒", description: "Online store" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">AI Creator</h1>
            <p className="text-sm text-sidebar-foreground/70">Local-first app builder</p>
          </div>
        </div>

        {/* AI Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-sidebar-accent rounded-lg">
          <div className="flex items-center gap-2">
            {isLocalMode ? (
              <HardDrive className="w-4 h-4 text-sidebar-accent-foreground" />
            ) : (
              <Cloud className="w-4 h-4 text-sidebar-accent-foreground" />
            )}
            <span className="text-sm font-medium text-sidebar-accent-foreground">
              {isLocalMode ? "Local AI" : "Cloud AI"}
            </span>
          </div>
          <Switch
            checked={!isLocalMode}
            onCheckedChange={(checked) => setIsLocalMode(!checked)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Quick Start</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <FolderOpen className="w-4 h-4" />
                  <span>Open Existing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Templates */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Templates</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {templates.map((template, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 text-left hover:bg-sidebar-accent"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sidebar-foreground truncate">
                        {template.name}
                      </p>
                      <p className="text-sm text-sidebar-foreground/70 truncate">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Recent Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 text-left hover:bg-sidebar-accent"
                >
                  <div className="flex items-center gap-3 w-full">
                    <History className="w-4 h-4 text-sidebar-foreground/50" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sidebar-foreground truncate">
                          {project.name}
                        </p>
                        <Badge
                          variant={project.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-sidebar-foreground/70">
                        {project.date}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-3 p-3 bg-sidebar-accent rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-sidebar-accent-foreground" />
            <span className="text-sm font-medium text-sidebar-accent-foreground">
              Status
            </span>
          </div>
          <p className="text-xs text-sidebar-accent-foreground/70">
            {isLocalMode ? "Running locally - Privacy first" : "Connected to cloud AI"}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};