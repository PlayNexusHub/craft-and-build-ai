import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Search, Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    {
      category: 'Getting Started',
      items: [
        { title: 'Creating Your First App', description: 'Learn how to generate your first application with AI prompts' },
        { title: 'Local vs Cloud AI', description: 'Understanding the difference between local and cloud AI processing' },
        { title: 'Project Management', description: 'How to save, load, and organize your projects' },
      ]
    },
    {
      category: 'AI Prompting',
      items: [
        { title: 'Writing Effective Prompts', description: 'Best practices for getting great results from AI' },
        { title: 'Iterative Development', description: 'How to refine and improve your generated apps' },
        { title: 'Advanced Features', description: 'Using complex prompts for sophisticated applications' },
      ]
    },
    {
      category: 'Technical',
      items: [
        { title: 'Troubleshooting Errors', description: 'Common issues and how to resolve them' },
        { title: 'Export & Distribution', description: 'Building and distributing your applications' },
        { title: 'Performance Optimization', description: 'Making your apps faster and more efficient' },
      ]
    }
  ];

  const filteredTopics = helpTopics.map(category => ({
    ...category,
    items: category.items.filter(item =>
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

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
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Find answers and get help with PlayNexus AI Creator</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Help Topics */}
          <div className="md:col-span-2 space-y-6">
            {filteredTopics.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
            
            {filteredTopics.length === 0 && searchQuery && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No help topics found for "{searchQuery}"</p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-2"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Get in touch with our support team.
                </p>
                
                <Button
                  className="w-full"
                  onClick={() => window.open('mailto:playnexushq@gmail.com?subject=PlayNexus%20AI%20Creator%20Support%20Request', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  <p><strong>Response Time:</strong> 24-48 hours</p>
                  <p><strong>Email:</strong> playnexushq@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/privacy')}
                >
                  Privacy Policy
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/eula')}
                >
                  License Agreement
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/about')}
                >
                  About PlayNexus
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Browser:</span>
                  <span>{navigator.userAgent.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform:</span>
                  <span>{navigator.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span>Build:</span>
                  <span>Production</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Send Feedback or Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Brief description of your issue or feedback" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Low - General feedback</option>
                  <option>Medium - Feature request</option>
                  <option>High - Bug report</option>
                  <option>Critical - App not working</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Please provide details about your issue or feedback..."
                className="min-h-[100px]"
              />
            </div>
            
            <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;