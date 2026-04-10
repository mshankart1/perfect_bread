import Image from 'next/image';

export async function AboutSection() {
  return (
    <div className='relative'>
      <Image src='/bread.png' alt='bread' width={500} height={500} className='absolute -bottom-10 w-68 max-md:w-60 max-sm:w-44 z-10 right-0 object-cover' />
      <Image src='/Wheat.png' alt='bread' width={500} height={500} className='absolute -top-10 w-60 max-md:w-40 max-sm:w-32 z-10 -left-5 object-cover rotate-90' />
      <section id="about" className="grid-cols-5 grid py-16 max-md:py-10 max-sm:py-6 gap-20 max-md:gap-10 max-sm:gap-4 max-sm:px-6 px-8 container">
        <div className='w-full col-span-2 max-lg:col-span-5 max-lg:w-4/7 max-md:w-2/3 overflow-hidden mx-auto '>
          <div
            className="border-6 border-primary aspect-[1/1.2] w-full border-b-0"
            style={{ borderRadius: '50% 50% 0 0' }}
          >
            <div className="w-[calc(100%-16px)] m-2 h-[calc(100%-16px)] overflow-hidden bg-[url('/ceo.png')] bg-no-repeat bg-cover bg-amber-100 -scale-x-100" style={{ borderRadius: '50% 50% 0 0', backgroundPosition: 'center 20px' }}>
            </div>
          </div>
          <div className="bg-primary text-white text-shadow-xs text-shadow-black text-center max-md:text-2xl max-sm:text-xl text-3xl font-bold py-1 font-roboto">Dr. H.K BATRA</div>
        </div>
        <div className="col-span-3 max-lg:col-span-5 text-center">
          <div className="text-primary">
            <span className="font-lightmoon text-4xl/relaxed font-bold max-md:text-3xl"> OUR HOT </span> <br className="max-lg:hidden" />
            <span className="font-impact text-6xl max-md:text-3xl">BAKING STORY</span>
            <hr className="border-b-2 border-primary w-3/4 max-w-sm mx-auto my-2" />
          </div>
          <div className="text-accent mt-5 max-md:mt-1 max-lg:mb-6 max-md:text-2xl max-lg:text-center">
            <span className="text-3xl font-roboto">CRAFTED BY</span>
            <div className="font-story-milky text-5xl max-md:text-3xl mt-2 max-md:mt-0 max-lg:inline max-lg:ml-2">
              MR. PERFECT MAN
            </div>
          </div>
          <p className="text-xl/tight mt-3 max-md:text-lg/tight relative text-roboto text-justify max-md:text-center z-20">
            In the continual journey of creativity and innovation, <strong>PERFECT BREAD’S</strong> evolution and growth
            as a nationally recognized bakery brand over the last more than <strong>25+ years</strong> has been shaped through three distinctive generations - each reflecting progress, passion and purpose.
          </p>
          <p className="text-xl/tight mt-3 max-md:text-lg/tight relative text-accent font-normal text-justify z-20 max-md:text-center">
            <strong>Perfect Beginnings:</strong> From the very first day of our journey in 1993, our passion for crafting wholesome, delicious food has remained unwavering. It is not just what we do - it defines who we are as people, as bakers, and as a family committed to quality and trust.
          </p>
        </div>
      </section>
    </div>
  );
}
