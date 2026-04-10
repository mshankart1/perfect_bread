import Image from 'next/image';

export function ComingSoon({ message = "We're baking up something fresh for you." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8">
        <div className="w-40 h-40 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
          <Image
            src="/perfect_logo.png"
            alt="Perfect Bread"
            width={200}
            height={200}
            className="w-24 h-24 object-contain opacity-80"
          />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/15 animate-pulse" />
        <div className="absolute -bottom-1 -left-3 w-6 h-6 rounded-full bg-secondary/30 animate-pulse [animation-delay:0.5s]" />
      </div>

      <h3 className="font-impact text-5xl max-md:text-3xl text-primary mb-3 tracking-wide">
        COMING SOON
      </h3>
      <p className="font-poppins text-lg max-md:text-base text-neutral-600 max-w-md leading-relaxed">
        {message} <br className="max-md:hidden" />
        Stay tuned for updates from <strong className="text-primary">Perfect Bread!</strong>
      </p>

      <div className="flex items-center gap-3 mt-8">
        <span className="block w-12 h-[2px] bg-primary/40" />
        <span className="block w-3 h-3 rounded-full bg-secondary" />
        <span className="block w-12 h-[2px] bg-primary/40" />
      </div>
    </div>
  );
}
