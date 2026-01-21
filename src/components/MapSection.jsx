import Image from 'next/image';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
const stores = [
  {
    location: 'Delhi NCR',
    sites: ['Ghaziabad', 'Vaishali', 'Noida', 'Kalkaji', 'Vasant Vihar', 'Tagore Garden'],
    color: '#d1212e',
  },
  {
    location: 'Haryana',
    sites: ['Panchkula', 'Ambala', 'Kurukshetra', 'Karnal', 'Panipat', 'Rohtak', 'Jhajjar', 'Faridabad', 'Gurugram'],
    color: '#fdc629',
  },
  {
    location: 'Rajasthan',
    sites: ['Alwar', 'Jhunjhunu'],
    color: '#247ad1',
  },
  {
    location: 'Punjab',
    sites: ['Amritsar', 'Kapurthala', 'Rupnagar', 'Jalandhar'],
    color: '#4c1401',
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
    color: '#19b0ff',
  },
  {
    location: 'Uttarakhand',
    sites: ['Uttarkashi', 'Tehri Garhwal', 'Dehradun', 'Haridwar'],
    color: '#80008f',
  },
  {
    location: 'Madhya Pradesh',
    sites: ['Sheopur', 'Morena'],
    color: '#008e37',
  },
];

export function MapSection() {
  return (
    <section
      id="distribution"
      className="flex flex-col items-center justify-center gap-8 max-md:gap-3 my-10 container mx-auto"
    >
      <h2 className="heading mb-8 max-md:mb-3 text-primary">PERFECT REACH</h2>
      <div className="grid grid-cols-2 max-md:grid-cols-1 px-4 gap-8 w-full">
        {/* Map */}
        <div className="w-full h-full">
          <Image src="/map.png" alt="map" width={1000} height={1000} />
        </div>

        {/* Stores */}
        <div className="w-full h-full columns-2 gap-2 mx-4">
          {stores.map((store) => (
            <div key={store.location} className="break-inside-avoid mb-6">
              <div className="flex flex-row gap-4 items-center mb-2 hover:scale-[1.05] transition-all duration-300 cursor-default">
                <SiHomeassistantcommunitystore className='w-6 h-6' style={{ color: store.color }} />
                <h3 className="text-2xl font-bold cursor-default">{store.location}</h3>
              </div>
              <ul className="list-none ml-12 text-lg cursor-default text-gray-800">
                {store.sites.map((site) => (
                  <li key={site} className="hover:scale-[1.03] transition-all duration-300 cursor-default">{site}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
