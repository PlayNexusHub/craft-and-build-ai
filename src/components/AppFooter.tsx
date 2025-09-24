import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, ExternalLink } from "lucide-react";

export const AppFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-primary rounded">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-sm">PlayNexus</h3>
                <p className="text-xs text-muted-foreground">AI Creator</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Local-first AI app development platform by <strong>Nortaq</strong>
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Product</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
                onClick={() => navigate('/about')}
              >
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
                onClick={() => navigate('/help')}
              >
                Help & Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Documentation
              </Button>
            </div>
          </div>

          {/* PlayNexus Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">PlayNexus Ecosystem</h4>
            <div className="space-y-2">
              <div className="text-xs">
                <span className="font-medium">ClanForge</span>
                <p className="text-muted-foreground">Esports & Gaming Tools</p>
              </div>
              <div className="text-xs">
                <span className="font-medium">BotForge</span>
                <p className="text-muted-foreground">AI & Discord Bots</p>
              </div>
              <div className="text-xs">
                <span className="font-medium">AI Creator</span>
                <p className="text-muted-foreground text-primary">Current Product</p>
              </div>
            </div>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Legal & Contact</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
                onClick={() => navigate('/privacy')}
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
                onClick={() => navigate('/eula')}
              >
                License Agreement
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground justify-start"
                onClick={() => window.open('mailto:playnexushq@gmail.com', '_blank')}
              >
                <Mail className="w-3 h-3 mr-1" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © 2024 Nortaq. All rights reserved. PlayNexus AI Creator v1.0.0
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Privacy-first • Local AI • Production Ready</span>
            <Button
              variant="ghost" 
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/contact')}
            >
              playnexushq@gmail.com
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};