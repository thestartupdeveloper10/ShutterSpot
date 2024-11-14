import { Camera, Users, MapPin, Star } from 'lucide-react';

const InfoCard = ({ icon, value, label }) => {
  return (
    <div className="mx-10 md:mx-0 px-8 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      {icon}
      <h2 className="font-extrabold md:text-3xl">{value}</h2>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
};

const InfoCardGrid = () => {
  const cards = [
    { icon: <Camera size={32} className="text-blue-500" />, value: "50K+", label: "Photographers" },
    { icon: <Users size={32} className="text-green-500" />, value: "1M+", label: "Happy Clients" },
    { icon: <MapPin size={32} className="text-red-500" />, value: "100+", label: "Cities Covered" },
    { icon: <Star size={32} className="text-yellow-500" />, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-20 -mt-[40px] md:-mt-[50px] relative md:mx-20">
      {cards.map((card, index) => (
        <InfoCard key={index} {...card} />
      ))}
    </div>
  );
};

export default InfoCardGrid;