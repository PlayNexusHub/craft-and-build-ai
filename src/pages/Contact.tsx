import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, MessageSquare, Globe, Clock, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    alert('Thank you for your message! We will get back to you within 24-48 hours.');
  };

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
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with the PlayNexus team</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Primary Contact</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    For all inquiries, support, and business matters:
                  </p>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open('mailto:playnexushq@gmail.com', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    playnexushq@gmail.com
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Company</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Developer:</strong> Nortaq</p>
                    <p><strong>Brand:</strong> PlayNexus</p>
                    <p><strong>Product:</strong> AI Creator</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Response Time
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• General inquiries: 24-48 hours</p>
                    <p>• Technical support: 12-24 hours</p>
                    <p>• Critical issues: Same day</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Types of Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border">
                  <h4 className="font-medium text-sm">Technical Support</h4>
                  <p className="text-xs text-muted-foreground">Bug reports, troubleshooting, installation help</p>
                </div>
                
                <div className="p-3 rounded-lg border">
                  <h4 className="font-medium text-sm">Business & Licensing</h4>
                  <p className="text-xs text-muted-foreground">Commercial use, enterprise licensing, partnerships</p>
                </div>
                
                <div className="p-3 rounded-lg border">
                  <h4 className="font-medium text-sm">Feature Requests</h4>
                  <p className="text-xs text-muted-foreground">Suggestions for new features and improvements</p>
                </div>
                
                <div className="p-3 rounded-lg border">
                  <h4 className="font-medium text-sm">General Feedback</h4>
                  <p className="text-xs text-muted-foreground">User experience feedback, testimonials</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  PlayNexus Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  PlayNexus AI Creator is part of our broader ecosystem of developer tools:
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="text-sm font-medium">ClanForge</span>
                    <span className="text-xs text-muted-foreground">Esports & Gaming Tools</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="text-sm font-medium">BotForge</span>
                    <span className="text-xs text-muted-foreground">AI & Discord Bots</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded border bg-primary/5">
                    <span className="text-sm font-medium">AI Creator</span>
                    <span className="text-xs text-muted-foreground">Current Product</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="What is your message about?" required />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Inquiry Type</label>
                  <select className="w-full p-2 border rounded-md bg-background" required>
                    <option value="">Select inquiry type</option>
                    <option value="technical">Technical Support</option>
                    <option value="business">Business & Licensing</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
                  <p>
                    By submitting this form, you agree to our Privacy Policy. 
                    Your information will only be used to respond to your inquiry.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Prefer email? Send directly to{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium"
                    onClick={() => window.open('mailto:playnexushq@gmail.com', '_blank')}
                  >
                    playnexushq@gmail.com
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">PlayNexus AI Creator</p>
              <p className="text-xs text-muted-foreground">
                Developed by Nortaq • Part of the PlayNexus ecosystem • 
                Empowering developers with AI-assisted application creation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;