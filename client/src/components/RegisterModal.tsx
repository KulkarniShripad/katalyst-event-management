import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import axios from "axios";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  eventId: number;
}

const RegisterModal = ({ open, onOpenChange, eventTitle, eventId }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    field: "",
    income: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.year || !formData.field) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/student/register", {studentData : formData, eventId});
      if (response.status == 201) {
        toast.success("Event Registered Successfully!");
      } else {
        toast.error("Failed to register for event. Please try again." + response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again." + error);
      return;
      
    } finally{
      onOpenChange(false);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      year: "",
      field: "",
      income: "",
      gender: "F",
    });
    setTrackingId(null);
    onOpenChange(false);
  };

  if (trackingId) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Registration Successful!
            </DialogTitle>
            <DialogDescription>
              Your registration for <span className="font-semibold text-primary">{eventTitle}</span> is confirmed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gradient-primary p-8 rounded-lg text-center">
              <div className="bg-background p-4 rounded-md inline-block">
                <QrCode className="w-24 h-24 text-foreground" />
              </div>
              <p className="text-primary-foreground mt-4 font-semibold">
                Tracking ID: {trackingId}
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">What's next?</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Check your email for the QR code</li>
                <li>Show this QR code at the event entrance</li>
                <li>Your attendance will be marked automatically</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleClose} variant="gradient" className="w-full">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>
            Complete your registration for <span className="font-semibold text-primary">{eventTitle}</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
  <Label htmlFor="gender">Gender *</Label>
  <div className="flex items-center space-x-4">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="gender"
        value="M"
        checked={formData.gender === "M"}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
      />
      <span>Male</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="gender"
        value="F"
        checked={formData.gender === "F"}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
      />
      <span>Female</span>
    </label>
  </div>
</div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college">College/Institution *</Label>
              <Input
                id="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study *</Label>
              <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="field">Field of Study *</Label>
              <Select value={formData.field} onValueChange={(value) => setFormData({ ...formData, field: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Other">Other STEM Field</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="income">Annual Family Income (Optional)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter annual income"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={loading}>
              {loading ? "Registering..." : "Complete Registration"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
