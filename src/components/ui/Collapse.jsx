'use client';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export function Collapse({ heading, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`w-full border-y-2 py-1 px-2 mt-4 overflow-hidden transition-all  duration-300 ${isOpen ? 'max-h-full' : 'max-h-12'}`}
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="text-3xl font-semibold">{heading}</div>
        <div>{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
