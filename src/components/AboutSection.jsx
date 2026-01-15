import Image from 'next/image';
import { Heading } from './ui';

export async function AboutSection() {
  return (
    <section id="about" className="grid-cols-5 grid py-16 max-md:py-10 max-sm:py-6 gap-20 px-8 container">
      <div
        className="border-6 border-primary col-span-2 max-lg:col-span-5 max-lg:w-4/7 max-md:w-2/3 overflow-hidden mx-auto aspect-[1/1.1] w-full"
        style={{ borderRadius: '0 40% 0px 40%' }}
      >
        <Image
          src="/ceo.png"
          alt="bread"
          width={1000}
          height={1000}
          className="w-full object-fit overflow -scale-x-100 pt-10 bg-amber-100"
        />
      </div>
      <div className="col-span-3 max-lg:col-span-5">
        <div className="heading text-primary text-left max-lg:text-center" style={{ lineHeight: '1.2' }}>
          OUR HOT <br className="max-lg:hidden" /> BAKING STORY
        </div>
        <div className="text-accent mt-5 max-md:mt-1 text-5xl max-lg:mb-6 max-md:text-2xl max-lg:text-center">
          <span className="font-medium">CRAFTED </span>
          <span className="text-4xl max-md:text-2xl">BY</span>
          <div className="text-accent text-5xl max-md:text-3xl mt-2 max-md:mt-0 max-lg:inline max-lg. :ml-2 font-semibold">
            Dr. H.K Batra !
          </div>
        </div>
        <p className="text-xl/tight mt-3 text-accent font-normal text-justify">
          In the continual process of creativity and innovation, <strong>PERFECT BREAD’S</strong> evolution and growth
          as a nationally recognized bakery brand over the last 20 years has been encapsulated through four distinctive
          Generations.
        </p>
        <p className="text-xl/tight mt-3 text-accent font-normal text-justify">
          Humble Beginnings: From the very beginning of our journey in 1993, we haven’t lost our passion for great food.
          It’s who we are as people, as bakers, and as family.
        </p>
      </div>
    </section>
  );
}
