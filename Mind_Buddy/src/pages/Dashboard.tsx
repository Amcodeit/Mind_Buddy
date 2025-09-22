import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  TrendingUp,
  Download,
  AlertTriangle,
  Heart,
  Shield,
  BookOpen,
  Activity
} from 'lucide-react';

// Mock data for charts
const userActivityData = [
  { month: 'Jan', students: 150, counselors: 12, admins: 3 },
  { month: 'Feb', students: 180, counselors: 14, admins: 3 },
  { month: 'Mar', students: 220, counselors: 16, admins: 4 },
  { month: 'Apr', students: 280, counselors: 18, admins: 4 },
  { month: 'May', students: 320, counselors: 20, admins: 5 },
  { month: 'Jun', students: 350, counselors: 22, admins: 5 },
];

const chatInteractionsData = [
  { day: 'Mon', interactions: 45, severity_low: 30, severity_medium: 12, severity_high: 3 },
  { day: 'Tue', interactions: 52, severity_low: 35, severity_medium: 15, severity_high: 2 },
  { day: 'Wed', interactions: 38, severity_low: 25, severity_medium: 10, severity_high: 3 },
  { day: 'Thu', interactions: 61, severity_low: 40, severity_medium: 18, severity_high: 3 },
  { day: 'Fri', interactions: 48, severity_low: 32, severity_medium: 14, severity_high: 2 },
  { day: 'Sat', interactions: 35, severity_low: 25, severity_medium: 8, severity_high: 2 },
  { day: 'Sun', interactions: 30, severity_low: 22, severity_medium: 6, severity_high: 2 },
];

const resourcePopularityData = [
  { name: 'Anxiety Management', value: 35, color: '#4A90E2' },
  { name: 'Sleep Hygiene', value: 25, color: '#7ED321' },
  { name: 'Study Skills', value: 20, color: '#F5A623' },
  { name: 'Depression Support', value: 15, color: '#D0021B' },
  { name: 'Mindfulness', value: 5, color: '#9013FE' },
];

const Dashboard = () => {
  const totalUsers = 377;
  const totalChatInteractions = 1247;
  const totalBookings = 89;
  const popularTopics = ['Academic Stress', 'Anxiety', 'Sleep Issues'];

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Active platform users'
    },
    {
      title: 'Chat Interactions',
      value: totalChatInteractions.toLocaleString(),
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: MessageCircle,
      description: 'AI support conversations'
    },
    {
      title: 'Session Bookings',
      value: totalBookings.toLocaleString(),
      change: '+15.7%',
      changeType: 'positive' as const,
      icon: Calendar,
      description: 'Counseling sessions scheduled'
    },
    {
      title: 'Crisis Interventions',
      value: '23',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      description: 'High-severity cases handled'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 fade-in">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Platform analytics and mental health insights
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="btn-enhanced">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="hero" className="btn-enhanced">
            View Live Data
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="enhanced-card slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heading">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs mt-2">
                <Badge 
                  variant="secondary" 
                  className={
                    stat.changeType === 'positive' 
                      ? 'bg-severity-low text-white' 
                      : 'bg-severity-medium text-white'
                  }
                >
                  {stat.change}
                </Badge>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>User Growth Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly user registration by role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#4A90E2" name="Students" />
                <Bar dataKey="counselors" fill="#7ED321" name="Counselors" />
                <Bar dataKey="admins" fill="#F5A623" name="Admins" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chat Interactions */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Daily Chat Activity</span>
            </CardTitle>
            <CardDescription>
              AI chat interactions and severity levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chatInteractionsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#4A90E2" 
                  strokeWidth={3}
                  name="Total Interactions"
                />
                <Line 
                  type="monotone" 
                  dataKey="severity_high" 
                  stroke="#D0021B" 
                  strokeWidth={2}
                  name="High Severity"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Popularity */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Popular Resources</span>
            </CardTitle>
            <CardDescription>
              Most accessed content categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={resourcePopularityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {resourcePopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription>
              Platform performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Uptime</span>
                <Badge variant="secondary" className="bg-severity-low text-white">99.8%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-severity-low h-2 rounded-full" style={{width: '99.8%'}}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <Badge variant="secondary" className="bg-severity-low text-white">95ms</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-severity-low h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Chat AI Accuracy</span>
                <Badge variant="secondary" className="bg-severity-low text-white">94.2%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-severity-low h-2 rounded-full" style={{width: '94.2%'}}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Score</span>
                <Badge variant="secondary" className="bg-severity-low text-white">A+</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-severity-low h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start btn-enhanced">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start btn-enhanced">
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
            <Button variant="outline" className="w-full justify-start btn-enhanced">
              <MessageCircle className="h-4 w-4 mr-2" />
              Review Chat Logs
            </Button>
            <Button variant="outline" className="w-full justify-start btn-enhanced">
              <BookOpen className="h-4 w-4 mr-2" />
              Content Moderation
            </Button>
            <Button variant="outline" className="w-full justify-start btn-enhanced">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Crisis Alerts
            </Button>
            <Button variant="hero" className="w-full btn-enhanced">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="enhanced-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Recent Platform Activity</span>
          </CardTitle>
          <CardDescription>
            Latest events and system updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-severity-high rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">High severity chat interaction detected</p>
                <p className="text-xs text-muted-foreground">Crisis intervention protocol activated • 2 minutes ago</p>
              </div>
              <Badge variant="secondary" className="bg-severity-high text-white">High Priority</Badge>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New counselor registered</p>
                <p className="text-xs text-muted-foreground">Dr. Jennifer Martinez added to platform • 15 minutes ago</p>
              </div>
              <Badge variant="secondary">New User</Badge>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Resource update published</p>
                <p className="text-xs text-muted-foreground">New anxiety management guide available • 1 hour ago</p>
              </div>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">Content</Badge>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-severity-low rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-muted-foreground">Daily backup successful • 2 hours ago</p>
              </div>
              <Badge variant="secondary" className="bg-severity-low text-white">System</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;