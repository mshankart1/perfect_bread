import Image from 'next/image';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
const stores = [
  {
    location: 'Delhi NCR',
    sites: ['Ghaziabad', 'Vaishali', 'Noida', 'Kalkaji', 'Vasant Vihar', 'Tagore Garden'],
    color: '#ff0000',
  },
  {
    location: 'Haryana',
    sites: ['Panchkula', 'Ambala', 'Kurukshetra', 'Karnal', 'Panipat', 'Rohtak', 'Jhajjar', 'Faridabad', 'Gurugram'],
    color: '#0000ff',
  },
  {
    location: 'Rajasthan',
    sites: ['Alwar', 'Jhunjhunu'],
    color: '#00ff00',
  },
  {
    location: 'Punjab',
    sites: ['Amritsar', 'Kapurthala', 'Rupnagar', 'Jalandhar'],
    color: '#ffff00',
  },
  {
    location: 'Uttar Pradesh',
    sites: [
      'Bijnor',
      'Jyotiba Phule Nagar',
      'Muzaffarnagar',
      'Saharanpur',
      'Ghaziabad',
      'Moradabad',
      'Aligarh',
      'Bulandshahr',
      'Gautam Buddha Nagar',
      'Meerut',
      'Mathura',
      'Agra',
    ],
    color: '#800080',
  },
  {
    location: 'Uttarakhand',
    sites: ['Uttarkashi', 'Tehri Garhwal', 'Dehradun', 'Haridwar'],
    color: '#ffa500',
  },
  {
    location: 'Madhya Pradesh',
    sites: ['Sheopur', 'Morena'],
    color: '#ffc0cb',
  },
];

export function MapSection() {
  return (
    <section id="distribution" className="flex flex-col items-center justify-center gap-8 my-10 container mx-auto">
      <h2 className="heading mb-8">PERFECT REACH</h2>
      <div className="grid grid-cols-2 max-md:grid-cols-1 px-4 gap-8 w-full">
        {/* Map */}
        <div className="w-full h-full">
          <Image src="/map.png" alt="map" width={1000} height={1000} />
        </div>

        {/* Stores */}
        <div className="w-full h-full columns-2 gap-2 mx-4">
          {stores.map((store) => (
            <div key={store.location} className="break-inside-avoid mb-6">
              <div className="flex gap-4 items-center mb-2">
                <SiHomeassistantcommunitystore className="w-8 h-8" style={{ color: store.color }} />
                <h3 className="text-2xl font-bold">{store.location}</h3>
              </div>
              <ul className="list-none ml-12 text-lg text-gray-800">
                {store.sites.map((site) => (
                  <li key={site}>{site}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
