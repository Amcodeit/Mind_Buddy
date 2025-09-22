import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Monitor,
  Settings,
  Users,
  MessageCircle,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react';

interface VideoCallWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  counselorName?: string;
  sessionType?: 'video' | 'audio';
}

const VideoCallWidget = ({ 
  isOpen, 
  onClose, 
  counselorName = "Dr. Sarah Wilson",
  sessionType = 'video' 
}: VideoCallWidgetProps) => {
  const [isVideoOn, setIsVideoOn] = useState(sessionType === 'video');
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Simulate call connection
  const handleConnect = () => {
    setIsConnected(true);
    // Simulate timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm ${isFullscreen ? '' : 'p-4'}`}>
      <Card className={`${isFullscreen ? 'h-full w-full rounded-none' : 'max-w-4xl mx-auto h-full'} bg-gradient-aurora border-0`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white">Session with {counselorName}</CardTitle>
                <CardDescription className="text-white/80 flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {isConnected ? 'Connected' : 'Connecting...'}
                  </Badge>
                  {isConnected && (
                    <span className="text-sm">{formatDuration(callDuration)}</span>
                  )}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 space-y-4">
          {/* Video Area */}
          <div className="relative h-96 bg-black/20 rounded-lg overflow-hidden">
            {sessionType === 'video' ? (
              <div className="grid grid-cols-2 h-full gap-2">
                {/* Remote Video */}
                <div className="relative bg-gradient-calm rounded-lg flex items-center justify-center">
                  <video
                    ref={remoteVideoRef}
                    className="w-full h-full object-cover rounded-lg"
                    playsInline
                    muted={false}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {counselorName}
                  </div>
                  {!isConnected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Waiting for counselor...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Local Video */}
                <div className="relative bg-gradient-warm rounded-lg flex items-center justify-center">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover rounded-lg"
                    playsInline
                    muted
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    You {!isVideoOn && '(Video Off)'}
                  </div>
                  {!isVideoOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <VideoOff className="h-12 w-12 text-white opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Audio Only Mode
              <div className="flex items-center justify-center h-full space-x-8">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-12 w-12" />
                  </div>
                  <p className="font-medium">{counselorName}</p>
                  <p className="text-sm opacity-80">Audio Call</p>
                </div>
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Mic className="h-12 w-12" />
                  </div>
                  <p className="font-medium">You</p>
                  <p className="text-sm opacity-80">{isAudioOn ? 'Mic On' : 'Muted'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 p-4 bg-black/20 rounded-lg">
            {/* Audio Control */}
            <Button
              variant={isAudioOn ? "secondary" : "destructive"}
              size="lg"
              onClick={() => setIsAudioOn(!isAudioOn)}
              className="rounded-full w-12 h-12 p-0"
            >
              {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            {/* Video Control (only for video calls) */}
            {sessionType === 'video' && (
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="lg"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full w-12 h-12 p-0"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
            )}

            {/* Screen Share */}
            <Button
              variant={isScreenSharing ? "default" : "outline"}
              size="lg"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className="rounded-full w-12 h-12 p-0"
            >
              <Monitor className="h-5 w-5" />
            </Button>

            {/* Speaker Control */}
            <Button
              variant={isSpeakerOn ? "secondary" : "outline"}
              size="lg"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className="rounded-full w-12 h-12 p-0"
            >
              {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>

            {/* Settings */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* Chat */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>

            {/* End Call */}
            <Button
              variant="destructive"
              size="lg"
              onClick={onClose}
              className="rounded-full w-12 h-12 p-0 bg-destructive hover:bg-destructive/90"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>

          {/* Connection Status */}
          {!isConnected && (
            <div className="text-center">
              <Button
                variant="hero"
                onClick={handleConnect}
                className="mb-2"
              >
                <Phone className="h-4 w-4 mr-2" />
                Join Session
              </Button>
              <p className="text-sm text-white/80">
                Click to start your confidential counseling session
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoCallWidget;