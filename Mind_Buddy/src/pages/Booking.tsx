import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  Phone,
  Shield,
  Heart,
  User,
  Mail,
  CheckCircle,
  AlertTriangle,
  PhoneCall
} from 'lucide-react';
import { format } from 'date-fns';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  avatar: string;
  rating: number;
  experience: string;
  availableSlots: string[];
  bio: string;
}

const mockCounselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Academic Stress', 'CBT'],
    avatar: '/api/placeholder/150/150',
    rating: 4.9,
    experience: '8 years',
    availableSlots: ['09:00', '11:00', '14:00', '16:00'],
    bio: 'Specializes in helping students navigate academic stress and develop healthy coping strategies.'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Licensed Therapist',
    specialties: ['ADHD', 'Study Skills', 'Social Anxiety', 'Mindfulness'],
    avatar: '/api/placeholder/150/150',
    rating: 4.8,
    experience: '12 years',
    availableSlots: ['10:00', '13:00', '15:00', '17:00'],
    bio: 'Expert in ADHD support and helping students develop effective study strategies and social confidence.'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Counseling Psychologist',
    specialties: ['Trauma', 'PTSD', 'Crisis Intervention', 'DBT'],
    avatar: '/api/placeholder/150/150',
    rating: 4.9,
    experience: '10 years',
    availableSlots: ['08:00', '12:00', '15:30', '18:00'],
    bio: 'Specializes in trauma-informed care and crisis intervention for students in acute distress.'
  }
];

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'online' | 'in-person'>('online');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    previousTherapy: '',
    notes: ''
  });
  const [step, setStep] = useState<'counselor' | 'datetime' | 'details' | 'confirmation'>('counselor');

  const selectedCounselorData = mockCounselors.find(c => c.id === selectedCounselor);

  const handleBooking = () => {
    // Simulate booking API call
    setStep('confirmation');
  };

  const renderCounselorSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Choose Your Counselor</h2>
        <p className="text-muted-foreground">
          Select a licensed professional who specializes in your area of concern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCounselors.map((counselor) => (
          <Card 
            key={counselor.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
              selectedCounselor === counselor.id ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
            onClick={() => setSelectedCounselor(counselor.id)}
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <CardTitle className="text-lg">{counselor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{counselor.title}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(counselor.rating) 
                              ? 'text-primary fill-current' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{counselor.rating}/5 • {counselor.experience}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{counselor.bio}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {counselor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setStep('datetime')}
          disabled={!selectedCounselor}
          variant="hero"
        >
          Continue to Date & Time
        </Button>
      </div>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Select Date & Time</h2>
        <p className="text-muted-foreground">
          Choose your preferred session date and time with {selectedCounselorData?.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Choose Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Available Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedCounselorData?.availableSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="h-12"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Type */}
          <Card>
            <CardHeader>
              <CardTitle>Session Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={sessionType} 
                onValueChange={(value: 'online' | 'in-person') => setSessionType(value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center space-x-2 cursor-pointer">
                    <Video className="h-4 w-4" />
                    <span>Online Session</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person" className="flex items-center space-x-2 cursor-pointer">
                    <MapPin className="h-4 w-4" />
                    <span>In-Person Session</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Urgency Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Urgency Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="urgent">This is urgent (within 24-48 hours)</Label>
              </div>
              {isUrgent && (
                <div className="mt-3 p-3 bg-severity-medium/10 rounded-lg">
                  <p className="text-sm text-severity-medium">
                    For immediate crisis support, please call the crisis helpline: 988
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('counselor')}>
          Back
        </Button>
        <Button 
          onClick={() => setStep('details')}
          disabled={!selectedDate || !selectedTime}
          variant="hero"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Session Details</h2>
        <p className="text-muted-foreground">
          Please provide some information to help us prepare for your session.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="(555) 123-4567"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Primary reason for seeking support *</Label>
            <Textarea
              id="reason"
              placeholder="Please describe what brings you here today..."
              rows={3}
              value={bookingForm.reason}
              onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previous">Previous therapy experience</Label>
            <Textarea
              id="previous"
              placeholder="Have you worked with a therapist before? Any relevant background..."
              rows={2}
              value={bookingForm.previousTherapy}
              onChange={(e) => setBookingForm({...bookingForm, previousTherapy: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any other information you'd like your counselor to know..."
              rows={2}
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('datetime')}>
          Back
        </Button>
        <Button 
          onClick={handleBooking}
          disabled={!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.reason}
          variant="hero"
        >
          Book Session
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-severity-low rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-white" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Session Booked Successfully!</h2>
        <p className="text-muted-foreground">
          Your confidential counseling session has been scheduled.
        </p>
      </div>

      <Card className="text-left max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Counselor:</span>
            <span className="font-medium">{selectedCounselorData?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium capitalize flex items-center">
              {sessionType === 'online' ? <Video className="h-4 w-4 mr-1" /> : <MapPin className="h-4 w-4 mr-1" />}
              {sessionType}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          You'll receive a confirmation email with session details and access instructions.
        </p>
        <Button variant="hero" onClick={() => window.location.href = '/'}>
          Return Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Confidential Counseling
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Book a private session with a licensed mental health professional. Your privacy and confidentiality are our top priority.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>Licensed Professionals</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span>Crisis Support Available</span>
          </div>
        </div>
      </div>

      {/* Crisis Support Banner */}
      <Card className="mb-8 bg-severity-high/10 border-severity-high/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-severity-high" />
            <div>
              <p className="font-medium text-severity-high">In Crisis? Get Immediate Help</p>
              <p className="text-sm text-muted-foreground">
                If you're having thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room.
              </p>
            </div>
            <Button variant="destructive" size="sm" className="ml-auto">
              <PhoneCall className="h-4 w-4 mr-1" />
              Call 988
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Booking Steps */}
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['counselor', 'datetime', 'details', 'confirmation'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s ? 'bg-primary text-primary-foreground' : 
                  ['counselor', 'datetime', 'details', 'confirmation'].indexOf(step) > index ? 'bg-severity-low text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-full h-1 mx-2 ${
                    ['counselor', 'datetime', 'details', 'confirmation'].indexOf(step) > index ? 'bg-severity-low' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Choose Counselor</span>
            <span>Date & Time</span>
            <span>Details</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step Content */}
        {step === 'counselor' && renderCounselorSelection()}
        {step === 'datetime' && renderDateTimeSelection()}
        {step === 'details' && renderDetailsForm()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
};

export default Booking;