'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHamburger, FaHome } from 'react-icons/fa';

export function Header({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (!e.target.value) {
      setSearchResults(products);
    }
    const results = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(results);
  };
  const router = useRouter();
  return (
    <div className="h-16 z-40 flex w-full text-primary bg-white sticky shadow-xl top-0">
      <ul className="grid grid-cols-[1fr_auto_1fr] justify-center container overflow font-semibold h-16 z-50 items-center max-lg:hidden">
        <div className="flex text-nowrap justify-between gap-2 grow">
          <FaHome size={25} className="cursor-pointer" onClick={() => router.push('/')} />
          <div className="capitalize text-center">
            <Link href={'/#about'}>About Us</Link>
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
            className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 rounded-full object-cover h-34 w-34 border cursor-pointer"
            width={1000}
            height={1000}
            onClick={() => router.push('/')}
          />
        </div>
        <div className="flex justify-between gap-2 text-nowrap items-center ">
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
          <div className="relative">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search....."
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className="border rounded-lg px-2 py-1.5 w-40 placeholder:font-medium focus:outline-none"
            />
            <div className="absolute right-0 rounded-lg gap-4 max-h-100 overflow-y-auto scroll-smooth top-[100%] w-full min-w-sm [&>*]:border-b [&>*]:last:border-b-0 flex-column bg-white font-medium shadow-[0px_4px_10px_0_rgba(0,0,0,0.4)]">
              {focus &&
                (searchResults.length ? (
                  searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="text-wrap flex flex-row  items-center h-full cursor-pointer gap-2 text-base/snug hover:bg-primary/10 py-2 px-3"
                      onMouseDown={() => {
                        router.push(`/${product?.slug || product?._id}`);
                      }}
                    >
                      <Image
                        src={product.imageUrl || null}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div>{product.title}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-wrap flex flex-row items-center h-full justify-center gap-2 text-base/snug hover:bg-primary/10 py-2 px-3">
                    No results found
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ul>
      <div className="max-lg:flex flex-row items-center px-10 max-sm:px-6 justify-end w-full hidden">
        <Image
          src="/perfect_logo.png"
          alt="logo"
          className="absolute left-2 z-10 top-0 rounded-full object-cover h-28 w-28 border cursor-pointer"
          width={1000}
          height={1000}
          onClick={() => router.push('/')}
        />
        <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer z-10">
          <FaHamburger size={28} />
        </span>
        {/* Dropdown Navbar for mobile view */}
        {isOpen && (
          <div className="absolute right-0 *:hover:bg-primary/40 *:py-2 *:px-4 top-full transition-all duration-300 ease-in-out mt-0 w-full pt-10 text-black bg-white shadow-lg rounded-b-lg z-0 p-4 px-0 flex flex-col gap-0">
            <Link href={'/#about'} className="capitalize text-left w-full block">
              About Us
            </Link>
            <Link href={'#product'} className="capitalize text-left w-full block">
              Product
            </Link>
            <Link href={'#world_beyond_bread'} className="capitalize text-left w-full block">
              World beyond Bread
            </Link>
            <Link href={'#distribution'} className="capitalize text-left w-full block">
              Distribution
            </Link>
            <Link href={'#recipe'} className="capitalize text-left w-full block">
              Recipes
            </Link>
            <Link href={'#blog'} className="capitalize text-left w-full block">
              Blog
            </Link>
            <Link href={'#client'} className="capitalize text-left w-full block">
              Our Client
            </Link>
            <Link href={'#contact'} className="capitalize text-left w-full block">
              Contact Us
            </Link>
            {/* <input type="text" placeholder="Search....." className="border rounded-3xl px-2 py-1 w-full" /> */}
          </div>
        )}
      </div>
    </div>
  );
}
