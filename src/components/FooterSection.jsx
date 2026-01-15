import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

export function FooterSection() {
  return (
    <div className="bg-primary w-full overflow-hidden text-white">
      <div className="container z-2 py-10 grid grid-cols-5 gap-10 px-5 relative">
        <Image
          width={500}
          height={500}
          className="absolute w-[10vw] min-w-lg max-lg:min-w-md max-md:min-w-sm opacity-90 max-lg:-right-16 -right-20 max-md:right-10 max-sm:right-0 -z-1 object-cover bottom-6"
          src="/footer_image.png"
          alt="footer"
        />
        <div className="flex flex-col gap-3 col-span-2">
          <h4 className="text-3xl font-semibold">Corporate Office</h4>
          <div className="flex gap-2 items-center">
            <MdPhone className="size-6" />
            <p className="text-lg">+91 92509 22830</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdEmail className="size-6" />
            <p className="text-lg">info@perfectbread.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdLocationOn className="size-10" />
            <p className="text-lg">
              <strong>Head Office: </strong> SCF 71/72 1st floor sector 15 main market, faridabad Haryana-121007
            </p>
          </div>
          <div className="flex flex-column"></div>
          <hr />
          <span>&copy;Copyright 2020 Perfect Bread All Rights Reserved</span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl fw-bold mb-2">Quick Links</h3>
          <Link href="">About Us</Link>
          <Link href="">Product</Link>
          <Link href="">World Beyond Breads</Link>
          <Link href="">Distribution</Link>
          <Link href="">Recipes</Link>
          <Link href="">Blog</Link>
          <Link href="">Our Clients</Link>
          <Link href="">Plant</Link>
          <Link href="">Contact Us</Link>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl fw-bold mb-2">Categories</h3>
          <Link href="">Bread</Link>
          <Link href="">Health and Wellness</Link>
          <Link href="">Sweet Bakery</Link>
          <Link href="">Bun And Paw</Link>
          <Link href="">Pizza</Link>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
