import React from 'react';
import { Camera, Aperture, Globe, Users, Smile, Camera as CameraIcon, Shield, ArrowUp } from 'lucide-react';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

// Mock data (replace with actual data fetching in a real application)
const photographerData = {
  name: "Cliffe",
  location: "Pleasanton",
  experience: "15 years of experience",
  about: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  portfolio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  booking: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.",
  equipment: {
    camera: "Canon 5d MKIV",
    lenses: "35mm, 85mm, 70-200mm, 14-24mm"
  },
  languages: ["English"],
  skills: ["Large Groups", "Capturing Emotions", "Candid Moments", "Story Telling", "Going the Extra Mile"]
};

const PhotoGrid = ({ images }) => (
  <div className="grid grid-cols-7 gap-2">
    <div className="col-span-2 flex flex-col gap-2">
      <img className="w-full h-full object-cover" src={images[0]} alt="Wedding" />
      <img className="w-full h-full object-cover" src={images[1]} alt="Food" />
    </div>
    <div className="col-span-3">
      <img className="w-full h-full object-cover" src={images[2]} alt="Studio" />
    </div>
    <div className="col-span-2 flex flex-col gap-2">
      <img className="w-full h-full object-cover" src={images[3]} alt="Landscape" />
      <img className="w-full h-full object-cover" src={images[4]} alt="Portrait" />
    </div>
  </div>
);

const ProfileHeader = ({ name, location, experience, image }) => (
  <div className="flex justify-center items-center gap-5 mt-16 bg-gray-100 p-4 rounded-lg">
    <div className='flex gap-2 justify-center items-center'><p>Available</p>
    <h1 className='h-4 w-4 bg-green-500 rounded-full'></h1>
    </div>
    <div className="rounded-full h-[100px] w-[100px] overflow-hidden">
      <img className="w-full h-full object-cover" src={image} alt={name} />
    </div>
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold">{name}</h1>
      <h3 className="text-lg">{location}</h3>
      <p className="text-sm text-gray-600">{experience}</p>
    </div>
  </div>
);

const InfoSection = ({ title, content }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p>{content}</p>
  </div>
);

const EquipmentItem = ({ icon: Icon, title, items }) => (
  <div className="flex gap-2 mb-4">
    <Icon size={24} className="text-gray-600" />
    <div>
      <h3 className="font-semibold">{title}:</h3>
      <p>{items}</p>
    </div>
  </div>
);

const SkillItem = ({ icon: Icon, skill }) => (
  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
    <Icon size={18} className="text-gray-600" />
    <span className="text-sm">{skill}</span>
  </div>
);

const Photographer_Details = () => {
  return (
    <div className="mt-[165px] md:mt-32">
      <NavBar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-[165px] md:mt-24">
        <PhotoGrid images={[
          'https://cdn.pixabay.com/photo/2022/01/13/00/05/austria-6934162_960_720.jpg',
          'https://cdn.pixabay.com/photo/2023/09/17/19/43/lizard-8259209_960_720.jpg',
          'https://cdn.pixabay.com/photo/2024/02/07/14/02/tree-8559118_960_720.jpg',
          'https://cdn.pixabay.com/photo/2023/11/16/18/46/mushroom-8392883_960_720.jpg',
          'https://cdn.pixabay.com/photo/2024/07/25/08/47/flower-8920535_960_720.jpg'
        ]} />
        
        <ProfileHeader 
          name={photographerData.name} 
          location={photographerData.location} 
          experience={photographerData.experience} 
          image="https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_960_720.jpg"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <InfoSection title="About Me" content={photographerData.about} />
          <InfoSection title="Portfolio" content={photographerData.portfolio} />
          <InfoSection title="Booking" content={photographerData.booking} />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Equipment</h2>
            <EquipmentItem icon={Camera} title="Camera" items={photographerData.equipment.camera} />
            <EquipmentItem icon={Aperture} title="Lenses" items={photographerData.equipment.lenses} />
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Languages & Skills</h2>
            <EquipmentItem icon={Globe} title="Languages spoken" items={photographerData.languages.join(', ')} />
            <h3 className="font-semibold mt-4 mb-2">I'm good with...</h3>
            <div className="flex flex-wrap gap-2">
              {photographerData.skills.map((skill, index) => (
                <SkillItem key={index} icon={
                  index === 0 ? Users :
                  index === 1 ? Smile :
                  index === 2 ? CameraIcon :
                  index === 3 ? Shield :
                  ArrowUp
                } skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Photographer_Details;