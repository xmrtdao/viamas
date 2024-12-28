import { MapPin } from 'lucide-react';

interface LocationCardProps {
  city: string;
  address: string;
  onClick: () => void;
}

const LocationCard = ({ city, address, onClick }: LocationCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100 animate-fade-up"
    >
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">{city}</h3>
      </div>
      <p className="text-gray-600">{address}</p>
    </div>
  );
};

export default LocationCard;