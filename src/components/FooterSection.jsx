import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

export function FooterSection() {
  return (
    <div className="bg-primary w-full overflow-hidden text-white">
      <div className="container z-2 py-10 grid grid-cols-5 gap-10 max-md:gap-3 px-5 max-md:px-4 relative">
        <Image
          width={500}
          height={500}
          className="absolute w-[9vw] min-w-lg max-lg:min-w-md max-md:min-w-sm opacity-90 max-lg:-right-16 -right-20 max-md:right-10 max-sm:-right-12 -z-1 object-cover -bottom-4"
          src="/footer_image.png"
          alt="footer"
        />
        <div className="flex flex-col gap-3 col-span-2 max-md:col-span-5">
          <h4 className="text-3xl font-semibold">Corporate Office</h4>
          <div className="flex gap-2 items-center">
            <MdPhone className="size-6" />
            <a href="tel:01294871451" className="text-lg">0129-4871451</a>
          </div>
          <div className="flex gap-2  items-center">
            <MdEmail className="size-6 flex-shrink-0" />
            <a href="mailto:info@perfectbread.com" className="text-lg break-all">info@perfectbread.com</a>
          </div>
          <div className="flex gap-2 items-center">
            <MdLocationOn className="size-6 flex-shrink-0" />
            <a href="https://maps.app.goo.gl/Gmz9MZyZmT4JWREU8" className="text-lg">
              <strong>Head Office: </strong> SCF 71/72 1st floor sector 15 main market, faridabad Haryana-121007
            </a>
          </div>
          <div className="flex flex-column"></div>
          <hr />
          <span>&copy;Copyright 2020 Perfect Bread All Rights Reserved</span>
        </div>
        <div className="flex flex-col max-md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <Link href="/#about">About Us</Link>
          <Link href="/#product">Product</Link>
          <Link href="/#world-beyond-breads">World Beyond Breads</Link>
          <Link href="/#distribution">Distribution</Link>
          <Link href="/#recipes">Recipes</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#our-clients">Our Clients</Link>
          <Link href="/plants-manufacturers">Plants & Manufacturers</Link>
          <Link href="/#contact-us">Contact Us</Link>
        </div>
        <div className="flex flex-col max-md:col-span-3">
          <h3 className="text-xl fw-bold font-semibold mb-2">Categories</h3>
          <Link href="/#product">White Bread</Link>
          <Link href="/#product">Health & Wellness</Link>
          <Link href="/#product">Sweet Bakery</Link>
          <Link href="/#product">Bun & Pav</Link>
          <Link href="/#product">Flat Bread</Link>
          <Link href="/#product">Rusk</Link>
        </div>
        <div className="col-span-1 max-md:col-span-2"></div>
      </div>
    </div>
  );
}
