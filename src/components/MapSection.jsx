import Image from 'next/image';
import { SiHomeassistantcommunitystore } from 'react-icons/si';

const stores = [
  {
    location: 'Delhi NCR',
    sites: ['Delhi', 'Faridabad', 'Ghaziabad', 'Gurugram', 'Indirapuram', 'Noida'],
    color: '#d1212e',
  },
  {
    location: 'Haryana',
    sites: [
      'Ambala', 'Firozpur Jhirka', 'Hasanpur', 'Hathin', 'Hodal', 'Jagadhri',
      'Karnal', 'Kurukshetra', 'Palwal', 'Panipat', 'Punhana', 'Rohtak',
      'Sonipat', 'Yamuna Nagar',
    ],
    color: '#fdc629',
  },
  {
    location: 'Madhya Pradesh',
    sites: ['Gwalior'],
    color: '#008e37',
  },
  {
    location: 'Punjab',
    sites: ['Amritsar', 'Jalandhar', 'Ludhiana', 'Panchkula', 'Tricity'],
    color: '#4c1401',
  },
  {
    location: 'Rajasthan',
    sites: ['Alwar', 'Bansur', 'Behror', 'Bharatpur', 'Bhiwadi'],
    color: '#247ad1',
  },
  {
    location: 'Uttar Pradesh',
    sites: [
      'Agra', 'Aligarh', 'Amroha', 'Bareilly', 'Bijnor', 'Bulandshahr',
      'Etah', 'Hapur', 'Jhansi', 'Kasganj', 'Mathura', 'Meerut',
      'Modinagar', 'Moradabad', 'Muzaffarnagar', 'Najibabad', 'Rampur',
      'Saharanpur',
    ],
    color: '#19b0ff',
  },
  {
    location: 'Uttarakhand',
    sites: ['Dehradun', 'Haldwani', 'Kashipur', 'Ramnagar', 'Rishikesh', 'Roorkee'],
    color: '#80008f',
  },
];

export function MapSection() {
  return (
    <section
      id="distribution"
      className="flex flex-col items-center justify-center gap-8 max-md:gap-3 my-10 container mx-auto"
    >
      <h2 className="heading mb-8 max-md:mb-3 text-primary">PERFECT REACH</h2>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 px-4 gap-8 w-full">
        {/* Map */}
        <div className="w-full h-full">
          <Image src="/map.png" alt="map" width={1000} height={1000} />
        </div>

        {/* Stores */}
        <div className="w-full h-full columns-2 gap-2 px-4 max-md:px-0">
          {stores.map((store) => (
            <div key={store.location} className="break-inside-avoid mb-6">
              <div className="flex flex-row gap-4 max-md:gap-3 items-center mb-2 hover:scale-[1.05] transition-all duration-300 cursor-default">
                <SiHomeassistantcommunitystore className='w-6 max-md:w-5 h-6 max-md:h-5' style={{ color: store.color }} />
                <h3 className="text-2xl max-md:text-xl max-sm:text font-bold cursor-default break-word">{store.location}</h3>
              </div>
              <ul className="list-none ml-12 max-md:ml-8 text-lg cursor-default text-gray-800">
                {store.sites.sort((a, b) => a.localeCompare(b)).map((site) => (
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
