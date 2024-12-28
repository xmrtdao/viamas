import { useState } from "react";
import { format } from "date-fns";
import LocationCard from "@/components/LocationCard";
import DateSelector from "@/components/DateSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bike, Calendar, MapPin, Send } from "lucide-react";

const locations = [
  {
    city: "Limón",
    address: "Avenida Central, Limón Centro",
  },
  {
    city: "San José",
    address: "Calle 1, San Pedro",
  },
  {
    city: "La Fortuna",
    address: "200m Norte del Parque Central",
  },
  {
    city: "Manuel Antonio",
    address: "Plaza Vista Shopping Center",
  },
];

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();

  const handleDateSelect = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleWhatsApp = () => {
    if (!selectedLocation || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please select both location and dates before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const message = `Hello! I would like to rent a bicycle in ${selectedLocation} from ${format(
      startDate,
      "MMMM d, yyyy"
    )} to ${format(endDate, "MMMM d, yyyy")}. Could you please provide me with availability and pricing information?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/50661500559?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517022812141-23620dba5c23")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6 animate-fade-up">
            <h1 className="text-5xl font-bold mb-4">
              Explore Costa Rica on Two Wheels
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the beauty of Costa Rica with our premium bicycle rental
              service available in four stunning locations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {/* Locations Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Choose Your Location</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location) => (
              <LocationCard
                key={location.city}
                city={location.city}
                address={location.address}
                onClick={() => setSelectedLocation(location.city)}
              />
            ))}
          </div>
        </section>

        {/* Date Selection Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Select Your Dates</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DateSelector onDateSelect={handleDateSelect} />
          </div>
        </section>

        {/* WhatsApp Button */}
        <section className="text-center">
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-primary hover:bg-forest text-white gap-2"
          >
            <Send className="w-5 h-5" />
            Contact via WhatsApp
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Index;