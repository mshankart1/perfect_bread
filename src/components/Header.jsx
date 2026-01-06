'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHamburger, FaHome } from 'react-icons/fa';

const headerItem = [
  { title: 'About Us', link: '#about' },
  { title: 'Product', link: '#product' },
  { title: 'plant', link: '#plant' },
  { title: 'distribution', link: '#distribution' },
  { title: 'World beyond Bread', link: '#world_beyond_bread' },
  { title: 'blog', link: '#blog' },
  { title: 'recipe', link: '#recipe' },
  { title: 'contact us', link: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-16 z-40 flex w-full text-primary bg-white sticky shadow-xl top-0 px-10">
      <div className="absolute inset-0 bg-[url('/contact-bg.png')] bg-cover bg-top opacity-20 " />
      <ul className="flex justify-center w-full gap-10 h-16 z-50 items-center max-lg:hidden">
        <div className="flex gap-10 text-nowrap">
          <FaHome size={25} />
          <div className="capitalize text-center">
            <Link href={'#about'}>About Us</Link>
          </div>
          <div className="capitalize text-center">
            <Link href="#product">Product</Link>
          </div>
          <div className="capitalize text-center">
            <Link href={'#journey'}>World beyond Bread</Link>
          </div>
          <div className="capitalize text-center">
            <Link href={'#distribution'}>Distribution</Link>
          </div>
        </div>
        <div className="h-full relative w-[150px]">
          <Image
            src="/perfect_logo.png"
            alt="logo"
            className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 rounded-full object-cover h-34 w-34 border"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex gap-10 text-nowrap items-center">
          <div className="capitalize text-center">
            <Link href={'#recipe'}>Recipes</Link>
          </div>
          <div className="capitalize text-center">
            <Link href={'/'}>Blog</Link>
          </div>
          <div className="capitalize text-center">
            <Link href={'#client'}>Our Client</Link>
          </div>
          <div className="capitalize text-center">
            <Link href="#contact">Contact Us</Link>
          </div>
          <input type="text" placeholder="Search....." className="border rounded-3xl px-2 py-1" />
        </div>
      </ul>
      <div className="max-lg:flex flex-row items-center justify-end w-full hidden">
        <Image
          src="/perfect_logo.png"
          alt="logo"
          className="absolute left-2 z-10 top-0 rounded-full object-cover h-28 w-28 border"
          width={1000}
          height={1000}
        />
        <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer z-10">
          <FaHamburger size={28} />
        </span>
        {/* Dropdown Navbar for mobile view */}
        {isOpen && (
          <div className="absolute right-0 *:hover:bg-primary/40 *:py-2 *:px-4 top-full transition-all duration-300 ease-in-out mt-0 w-full pt-10 text-black bg-white shadow-lg rounded-b-lg z-0 p-4 px-0 flex flex-col gap-0">
            <Link href={'/'} className="capitalize text-left w-full block">
              About Us
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Product
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              World beyond Bread
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Distribution
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Recipes
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Blog
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Our Client
            </Link>
            <Link href={'/'} className="capitalize text-left w-full block">
              Contact Us
            </Link>
            {/* <input type="text" placeholder="Search....." className="border rounded-3xl px-2 py-1 w-full" /> */}
          </div>
        )}
      </div>
    </div>
  );
}
