import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import heroImage from '@/assets/freepik__retouch__90823.png';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Shield, 
  Lock, 
  Heart,
  CheckCircle,
  Phone,
  Globe,
  Zap,
  Star
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <GuestHomePage />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Welcome Section */}
      <section className="text-center space-y-4 fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your mental wellness journey continues here. How can we support you today?
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10">
          <Heart className="h-4 w-4 mr-1" />
          {user.role === 'student' ? 'Student Portal' : 
           user.role === 'counselor' ? 'Counselor Dashboard' : 'Admin Panel'}
        </Badge>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === 'student' && (
          <>
            <ActionCard
              title="AI Chat Support"
              description="Get immediate help and assessment"
              icon={MessageCircle}
              href="/chat"
              variant="hero"
              badge="24/7 Available"
            />
            <ActionCard
              title="Book Session"
              description="Schedule with a counselor"
              icon={Calendar}
              href="/booking"
              variant="trust"
              badge="Confidential"
            />
            <ActionCard
              title="Explore Resources"
              description="Self-help materials & guides"
              icon={BookOpen}
              href="/resources"
              variant="secondary"
            />
            <ActionCard
              title="Join Forum"
              description="Connect with peer support"
              icon={Users}
              href="/forum"
              variant="gentle"
              badge="Anonymous"
            />
          </>
        )}

        {user.role === 'counselor' && (
          <>
            <ActionCard
              title="My Sessions"
              description="View and manage appointments"
              icon={Calendar}
              href="/sessions"
              variant="trust"
            />
            <ActionCard
              title="Chat Support"
              description="Assist students in crisis"
              icon={MessageCircle}
              href="/chat-support"
              variant="safety"
              badge="Priority"
            />
            <ActionCard
              title="Resources"
              description="Access counseling materials"
              icon={BookOpen}
              href="/resources"
              variant="secondary"
            />
            <ActionCard
              title="Forum Moderation"
              description="Support peer discussions"
              icon={Users}
              href="/forum"
              variant="gentle"
            />
          </>
        )}

        {user.role === 'admin' && (
          <>
            <ActionCard
              title="Analytics Dashboard"
              description="Platform usage insights"
              icon={Calendar}
              href="/dashboard"
              variant="trust"
            />
            <ActionCard
              title="User Management"
              description="Manage users and roles"
              icon={Users}
              href="/users"
              variant="secondary"
            />
            <ActionCard
              title="System Health"
              description="Monitor platform status"
              icon={Shield}
              href="/system"
              variant="gentle"
            />
            <ActionCard
              title="Content Moderation"
              description="Review and moderate content"
              icon={BookOpen}
              href="/moderation"
              variant="safety"
            />
          </>
        )}
      </section>

      {/* Recent Activity or Stats */}
      <section className="space-y-6 slide-up">
        <h2 className="text-2xl font-semibold text-center">Your Mental Wellness Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="This Week"
            stats={[
              { label: "Chat Sessions", value: "3" },
              { label: "Resources Viewed", value: "7" },
            ]}
          />
          <StatsCard
            title="Progress"
            stats={[
              { label: "Mood Trend", value: "Improving" },
              { label: "Check-ins", value: "5/7 days" },
            ]}
          />
          <StatsCard
            title="Community"
            stats={[
              { label: "Forum Posts", value: "2" },
              { label: "Peer Connections", value: "12" },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

const GuestHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-gradient-calm overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 116, 233, 0.1), rgba(229, 235, 223, 0.1)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              Your Mental Health
              <br />Matters
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto font-medium">
              MindBuddy provides confidential, accessible, and stigma-free mental health support 
              for students. Get immediate AI assistance, book counseling sessions, and connect with peers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="xl" className="text-lg">
              <Link to="/login">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="text-lg">
              <Link to="#learn-more">Learn More</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-foreground/80">
            <div className="flex items-center space-x-1">
              <Lock className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>Stigma-Free</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access CTAs */}
      <section id="learn-more" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need for Mental Wellness</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support designed specifically for students, by mental health professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={MessageCircle}
              title="AI First Aid Chat"
              description="Immediate support with PHQ-9 and GAD-7 screening for crisis detection"
              badge="Instant Help"
            />
            <FeatureCard
              icon={Calendar}
              title="Confidential Booking"
              description="Schedule sessions with licensed counselors in complete privacy"
              badge="Professional Care"
            />
            <FeatureCard
              icon={BookOpen}
              title="Resource Hub"
              description="Evidence-based materials for stress, anxiety, sleep, and exam preparation"
              badge="Self-Help Tools"
            />
            <FeatureCard
              icon={Users}
              title="Peer Support"
              description="Anonymous forums with verified volunteer mentors for community support"
              badge="Community"
            />
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="support" size="lg">
              <Link to="/login">Start Your Journey Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  icon: any;
  href: string;
  variant?: any;
  badge?: string;
}

const ActionCard = ({ title, description, icon: Icon, href, variant = "default", badge }: ActionCardProps) => {
  return (
    <Card className="enhanced-card fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button asChild variant="hero" className="w-full btn-enhanced">
          <Link to={href}>Access Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  badge: string;
}

const FeatureCard = ({ icon: Icon, title, description, badge }: FeatureCardProps) => {
  return (
    <Card className="enhanced-card slide-up">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 w-fit">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
          {badge}
        </Badge>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

interface StatsCardProps {
  title: string;
  stats: { label: string; value: string }[];
}

const StatsCard = ({ title, stats }: StatsCardProps) => {
  return (
    <Card className="enhanced-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-semibold text-primary">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Index;