import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  ThumbsUp, 
  Reply, 
  Shield, 
  Heart, 
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  MoreVertical
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
  category: string;
  replies: number;
  likes: number;
  views: number;
  isVerifiedMentor?: boolean;
  tags: string[];
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Dealing with exam anxiety - any tips?',
    content: 'I have finals coming up next week and I\'m feeling overwhelmed. My heart races every time I think about the exams. Has anyone found effective ways to manage this?',
    author: 'Anonymous Student',
    isAnonymous: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'Academic Stress',
    replies: 12,
    likes: 18,
    views: 156,
    tags: ['anxiety', 'exams', 'stress-management']
  },
  {
    id: '2',
    title: 'Meditation apps that actually work?',
    content: 'I\'ve tried several meditation apps but haven\'t found one that clicks with me. Looking for recommendations, especially for beginners.',
    author: 'MindfulStudent22',
    isAnonymous: false,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: 'Mindfulness',
    replies: 8,
    likes: 14,
    views: 89,
    tags: ['meditation', 'apps', 'mindfulness']
  },
  {
    id: '3',
    title: 'How I improved my sleep schedule as a college student',
    content: 'After struggling with insomnia for months, I finally found a routine that works. Sharing what helped me in case it helps others...',
    author: 'Dr. Sarah Wilson',
    isAnonymous: false,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: 'Sleep Health',
    replies: 24,
    likes: 45,
    views: 234,
    isVerifiedMentor: true,
    tags: ['sleep', 'routine', 'self-care']
  },
  {
    id: '4',
    title: 'Support group for social anxiety?',
    content: 'Is there interest in starting a weekly virtual support group for students dealing with social anxiety? I think it could be really helpful.',
    author: 'Anonymous Student',
    isAnonymous: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    category: 'Peer Support',
    replies: 6,
    likes: 11,
    views: 67,
    tags: ['social-anxiety', 'support-group', 'community']
  }
];

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General Discussion',
    isAnonymous: true
  });

  const categories = [
    'all',
    'Academic Stress',
    'Mindfulness',
    'Sleep Health',
    'Peer Support',
    'General Discussion',
    'Crisis Support'
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: newPost.isAnonymous ? 'Anonymous Student' : 'Current User',
      isAnonymous: newPost.isAnonymous,
      timestamp: new Date(),
      category: newPost.category,
      replies: 0,
      likes: 0,
      views: 0,
      tags: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'General Discussion', isAnonymous: true });
    setShowNewPostForm(false);
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Peer Support Forum
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow students in a safe, anonymous space. Share experiences, get support, and help others on their mental wellness journey.
        </p>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowNewPostForm(!showNewPostForm)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Create New Discussion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                placeholder="What would you like to discuss?"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                placeholder="Share your thoughts, experiences, or questions..."
                rows={4}
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={newPost.isAnonymous}
                onCheckedChange={(checked) => setNewPost({...newPost, isAnonymous: checked})}
              />
              <Label htmlFor="anonymous">Post anonymously</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
              >
                Post Discussion
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {post.author}
                    </span>
                    {post.isVerifiedMentor && (
                      <Badge variant="secondary" className="bg-trust text-trust-foreground">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Mentor
                      </Badge>
                    )}
                    {post.isAnonymous && (
                      <Badge variant="outline" className="text-xs">
                        Anonymous
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo(post.timestamp)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight hover:text-primary cursor-pointer transition-colors">
                  {post.title}
                </CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {post.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {post.content}
              </CardDescription>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views} views</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or be the first to start a discussion!</p>
          <Button onClick={() => setShowNewPostForm(true)}>
            Start a Discussion
          </Button>
        </div>
      )}

      {/* Community Guidelines */}
      <Card className="bg-gradient-calm border-0">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Community Guidelines</span>
          </CardTitle>
          <CardDescription>
            Our forum is a safe space for everyone. Please be respectful, supportive, and kind.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium">Stay Safe</h4>
              <p className="text-muted-foreground">Don't share personal information. Use anonymous posting when needed.</p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h4 className="font-medium">Be Supportive</h4>
              <p className="text-muted-foreground">Offer encouragement and empathy. We're all here to help each other.</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <h4 className="font-medium">Respect Others</h4>
              <p className="text-muted-foreground">Treat everyone with dignity. No judgment, discrimination, or harmful content.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forum;