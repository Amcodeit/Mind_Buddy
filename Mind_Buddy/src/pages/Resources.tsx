import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Play, 
  Volume2, 
  Download, 
  Search,
  Clock,
  Users,
  Heart,
  Brain,
  Moon,
  Coffee,
  Zap,
  Filter
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'tool';
  category: 'stress' | 'mindfulness' | 'sleep' | 'anxiety' | 'depression' | 'study';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'english' | 'spanish' | 'mandarin';
  thumbnail?: string;
  views?: number;
  rating?: number;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Deep Breathing for Exam Anxiety',
    description: 'Learn the 4-7-8 breathing technique to calm pre-exam nerves and improve focus.',
    type: 'video',
    category: 'anxiety',
    duration: '8 min',
    difficulty: 'beginner',
    language: 'english',
    views: 1247,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Progressive Muscle Relaxation Guide',
    description: 'Audio guide for releasing physical tension and promoting deep relaxation.',
    type: 'audio',
    category: 'stress',
    duration: '15 min',
    difficulty: 'beginner',
    language: 'english',
    views: 892,
    rating: 4.6
  },
  {
    id: '3',
    title: 'Sleep Hygiene for Students',
    description: 'Evidence-based strategies to improve sleep quality and establish healthy sleep patterns.',
    type: 'article',
    category: 'sleep',
    duration: '5 min read',
    difficulty: 'beginner',
    language: 'english',
    views: 2134,
    rating: 4.9
  },
  {
    id: '4',
    title: 'Mindful Study Sessions',
    description: 'Interactive tool to plan focused study sessions with built-in mindfulness breaks.',
    type: 'tool',
    category: 'study',
    difficulty: 'intermediate',
    language: 'english',
    views: 567,
    rating: 4.5
  },
  {
    id: '5',
    title: 'Técnicas de Respiración',
    description: 'Guía en español para técnicas de respiración que reducen el estrés y la ansiedad.',
    type: 'video',
    category: 'stress',
    duration: '10 min',
    difficulty: 'beginner',
    language: 'spanish',
    views: 743,
    rating: 4.7
  },
  {
    id: '6',
    title: 'Managing Depression Symptoms',
    description: 'Comprehensive guide to recognizing and managing depression symptoms with practical strategies.',
    type: 'article',
    category: 'depression',
    duration: '12 min read',
    difficulty: 'intermediate',
    language: 'english',
    views: 1876,
    rating: 4.8
  }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpen },
    { id: 'stress', label: 'Stress Relief', icon: Heart },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
    { id: 'sleep', label: 'Sleep Hygiene', icon: Moon },
    { id: 'anxiety', label: 'Exam Anxiety', icon: Zap },
    { id: 'depression', label: 'Depression Support', icon: Coffee },
    { id: 'study', label: 'Study Skills', icon: BookOpen },
  ];

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesType = selectedType === 'all' || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'audio': return Volume2;
      case 'article': return BookOpen;
      case 'tool': return Zap;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-severity-high text-white';
      case 'audio': return 'bg-severity-medium text-white';
      case 'article': return 'bg-primary text-primary-foreground';
      case 'tool': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-severity-low text-white';
      case 'intermediate': return 'bg-severity-medium text-white';
      case 'advanced': return 'bg-severity-high text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Psychoeducational Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Evidence-based resources to support your mental health journey. All content is reviewed by licensed professionals.
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Find Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="category" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
            </TabsList>

            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="type" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {['all', 'article', 'video', 'audio', 'tool'].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="capitalize"
                  >
                    {type === 'all' ? 'All Types' : type}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="language" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {['all', 'english', 'spanish', 'mandarin'].map((language) => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                    className="capitalize"
                  >
                    {language === 'all' ? 'All Languages' : language}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredResources.length} resources
        </p>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download All (PDF)
        </Button>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <Card key={resource.id} className="group hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${getTypeColor(resource.type)}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {resource.language}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{resource.duration}</span>
                  </div>
                  {resource.views && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{resource.views} views</span>
                    </div>
                  )}
                </div>

                {resource.rating && (
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(resource.rating!) 
                              ? 'text-primary fill-current' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {resource.rating}/5
                    </span>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button variant="default" className="flex-1">
                    {resource.type === 'article' ? 'Read' : 
                     resource.type === 'video' ? 'Watch' :
                     resource.type === 'audio' ? 'Listen' : 'Use Tool'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Help Section */}
      <Card className="bg-gradient-calm border-0">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Need Immediate Support?</span>
          </CardTitle>
          <CardDescription>
            If you're experiencing a mental health crisis, don't wait - reach out for immediate help.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="safety">
            Crisis Helpline: 988
          </Button>
          <Button variant="trust">
            Chat with AI Support
          </Button>
          <Button variant="gentle">
            Book Emergency Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;