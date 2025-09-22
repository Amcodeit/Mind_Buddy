import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, GraduationCap, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  students: number;
  established: string;
  featured?: boolean;
}

const institutions: Institution[] = [
  {
    id: '1',
    name: 'BP Poddar Institute of Management and Technology',
    type: 'Engineering & Management',
    location: 'Kolkata, West Bengal',
    students: 2500,
    established: '2001',
    featured: true
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    type: 'Engineering & Technology',
    location: 'New Delhi',
    students: 8500,
    established: '1961'
  },
  {
    id: '3',
    name: 'Delhi University',
    type: 'Multi-disciplinary',
    location: 'New Delhi',
    students: 130000,
    established: '1922'
  },
  {
    id: '4',
    name: 'Jadavpur University',
    type: 'Engineering & Arts',
    location: 'Kolkata, West Bengal',
    students: 12000,
    established: '1955'
  },
  {
    id: '5',
    name: 'Indian Institute of Management Calcutta',
    type: 'Management',
    location: 'Kolkata, West Bengal',
    students: 1200,
    established: '1961'
  },
  {
    id: '6',
    name: 'Christ University',
    type: 'Multi-disciplinary',
    location: 'Bangalore, Karnataka',
    students: 25000,
    established: '1969'
  }
];

const InstitutionSelection = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedInstitution) {
      // Store selected institution in localStorage for now
      localStorage.setItem('selected_institution', selectedInstitution);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Select Your Institution
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Welcome {user?.name}! Choose your college or university to continue.
          </p>
          <Badge variant="secondary" className="mb-6">
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {institutions.map((institution) => (
            <Card 
              key={institution.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedInstitution === institution.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              } ${institution.featured ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : ''}`}
              onClick={() => setSelectedInstitution(institution.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Building2 className="h-6 w-6 text-primary mb-2" />
                  {selectedInstitution === institution.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
                  {institution.name}
                  {institution.featured && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Featured
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{institution.type}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>{institution.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{institution.students.toLocaleString()} students</span>
                  </div>
                  <div className="text-xs">
                    Established: {institution.established}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedInstitution}
            size="lg"
            className="px-8 py-3 text-lg font-semibold"
          >
            Continue to Dashboard
          </Button>
          {!selectedInstitution && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select an institution to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionSelection;