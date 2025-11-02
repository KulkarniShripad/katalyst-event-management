import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import eventPattern from "@/assets/event-pattern.jpg";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    field: string;
    status: string;
  };
  onInterested: () => void;
  onRegister: () => void;
}

const EventCard = ({ event, onInterested, onRegister }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-success text-success-foreground';
      case 'ongoing':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border/50">
      <div 
        className="h-48 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${eventPattern})` }}
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-primary-foreground mb-1">
            {event.title}
          </h3>
          <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-primary-foreground/30">
            {event.field}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{event.startDate} {event.startTime}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>Until {event.endDate} {event.endTime}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2 pt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onInterested}
        >
          I'm Interested
        </Button>
        <Button 
          variant="gradient" 
          className="flex-1"
          onClick={onRegister}
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
