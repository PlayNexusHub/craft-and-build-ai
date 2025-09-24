import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Shield, Zap, Code, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PlayNexus AI Creator</h1>
              <p className="text-muted-foreground">Local-first AI app development platform</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Version</h4>
                <Badge variant="outline">v1.0.0 - Production Ready</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Developer</h4>
                <p className="text-muted-foreground">Nortaq</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Brand Ecosystem</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PlayNexus</span>
                    <Badge>Parent Brand</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ClanForge</span>
                    <Badge variant="outline">Clan/Esports Tools</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">BotForge</span>
                    <Badge variant="outline">AI/Discord Bots</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-sm">Privacy-First</p>
                  <p className="text-xs text-muted-foreground">Local AI processing, your data stays private</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-sm">AI-Powered Generation</p>
                  <p className="text-xs text-muted-foreground">Create full applications from natural language</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Code className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-sm">Production Ready</p>
                  <p className="text-xs text-muted-foreground">Generate distributable desktop, web, and mobile apps</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-sm">Offline Capable</p>
                  <p className="text-xs text-muted-foreground">Works without internet when using local models</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Vite</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Backend</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">Supabase</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Edge Functions</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">AI Integration</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">Local Models</Badge>
                  <Badge variant="secondary">OpenAI API</Badge>
                  <Badge variant="secondary">Anthropic</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Primary Contact</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  For technical support, licensing questions, or general inquiries:
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('mailto:playnexushq@gmail.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  playnexushq@gmail.com
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Access help guides, tutorials, and API documentation:
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Nortaq. PlayNexus AI Creator is part of the PlayNexus ecosystem of developer tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;