import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { AppSidebar } from "./AppSidebar";
import { AIChat } from "./AIChat";
import { ProjectWorkspace } from "./ProjectWorkspace";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 border-b border-border bg-card flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h2 className="font-semibold text-card-foreground">AI App Creator</h2>
            </div>
          </header>

          {/* Content Panels */}
          <div className="flex-1">
            <ResizablePanelGroup direction="horizontal">
              {/* Chat Panel */}
              <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                <AIChat />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Workspace Panel */}
              <ResizablePanel defaultSize={65} minSize={50}>
                <ProjectWorkspace />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};