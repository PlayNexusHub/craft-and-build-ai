import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">PlayNexus AI Creator by Nortaq</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Privacy-First Development</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Our Commitment to Privacy</h3>
              <p className="text-muted-foreground">
                PlayNexus AI Creator is designed with privacy-first principles. We believe your code, 
                projects, and creative work should remain under your control.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Local-First Architecture</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>All code generation happens locally on your device when possible</li>
                <li>Your projects are stored locally and optionally backed up to your own Supabase instance</li>
                <li>We do not have access to your generated code or project data</li>
                <li>Cloud AI services are only used when explicitly enabled by you</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Data We Collect</h3>
              <div className="text-muted-foreground">
                <p><strong>When using Local AI mode:</strong></p>
                <ul className="list-disc list-inside mb-4">
                  <li>No data is sent to external services</li>
                  <li>All processing happens on your device</li>
                </ul>
                
                <p><strong>When using Cloud AI mode (optional):</strong></p>
                <ul className="list-disc list-inside">
                  <li>Only your prompts are sent to AI service providers</li>
                  <li>Generated code responses are received but not stored by us</li>
                  <li>No personal information is included in AI requests</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Full ownership of all generated code and projects</li>
                <li>Right to use generated code commercially without attribution</li>
                <li>Right to export your data at any time</li>
                <li>Right to delete your data from our systems</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="text-muted-foreground">
                <p><strong>Company:</strong> Nortaq</p>
                <p><strong>Product:</strong> PlayNexus AI Creator</p>
                <p><strong>Email:</strong> playnexushq@gmail.com</p>
                <p><strong>Privacy Questions:</strong> Send email with subject "Privacy Inquiry"</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Updates to This Policy</h3>
              <p className="text-muted-foreground">
                We may update this privacy policy to reflect changes in our practices or applicable laws. 
                Any updates will be posted in the application and on our website.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;