import Image from 'next/image';

export function PartnersSections() {
  const partners = [
    '/partners/partners_1.jpg',
    '/partners/partners_2.jpg',
    '/partners/partners_3.jpg',
    '/partners/partners_4.jpg',
    '/partners/partners_5.jpg',
    '/partners/partners_6.jpg',
    '/partners/partners_7.jpg',
    '/partners/partners_8.jpg',
    '/partners/partners_9.jpg',
    '/partners/partners_10.jpg',
  ];
  return (
    <div className="bg-primary py-4 text-white">
      <section className="container mx-auto px-4">
        <h2 className="heading mb-8">PERFECT PARTNERS</h2>
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 my-10 gap-10 max-lg:gap-6">
          {partners.map((image, index) => (
            <div key={image.split('/').pop()} className="w-full bg-white aspect-[1.1/1] border border-black/50 shadow-lg p-4 rounded-xl object-contain">
            <Image
              src={image}
              alt={image.split('/').pop()}
              width={500}
              height={500}
              className="w-full bg-white aspect-[1.1] rounded-xl object-contain cursor-default hover:scale-110 transition-all duration-300"
              priority
            />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
