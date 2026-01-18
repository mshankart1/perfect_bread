import Image from 'next/image';

export function EComPartnerSection() {
  const partners = [
    '/ecom-partners/big-basket.png',
    '/ecom-partners/blinkit.png',
    '/ecom-partners/flipkart-minutes.png',
    '/ecom-partners/instamart.png',
  ];
  return (
    <section id="client" className="container mx-auto my-14 max-lg:my-10">
      <h2 className="heading text-primary mb-8">E-COMMERCE PARTNER</h2>
      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 my-10 px-4">
        {partners.map((partner) => (
          <div className="w-full bg-white aspect-[1.3/1] border border-black/50 p-4 object-contain">
          <Image
            key={partner.split('/').pop()}
            src={partner}
            alt={partner}
            width={500}
            height={500}
            className="w-full aspect-[1.3] object-contain cursor-default hover:scale-110 transition-all duration-300"
            priority
          />
          </div>
        ))}
      </div>
    </section>
  );
}
