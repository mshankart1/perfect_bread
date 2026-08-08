'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { GrOrganization } from 'react-icons/gr';
import { MdEmail, MdPhone, MdFactory } from 'react-icons/md';

const locations = [
  {
    name: "L.R. Foods Pvt. Ltd.",
    address:
      "Indira Complex, Industrial Area, Sector-87, Greater Faridabad, Haryana 121002",
    phones: ["09250922857", "+91-9250922830"],
    type: "factory",
  },
  {
    name: "Seeta Foods Pvt. Ltd.",
    address:
      "Plot No. 11, 12 & 28, Industrial Area, Hatin, District Palwal, Haryana 121103",
    phones: ["09728102335", "09250922858"],
    type: "factory",
  },
  {
    name: "Perfect Food Industries",
    address:
      "Plot No. 81, 93 & 94, Sector-5, IIE SIDCUL, Haridwar, Uttarakhand",
    phones: ["9720001822"],
    type: "factory",
  },
  {
    name: "Perfect Bread Pvt. Ltd.",
    address:
      "Plot No. 106-111, HSIIDC Food Park, Saha, Ambala 133001",
    phones: ["9050004305"],
    type: "factory",
  },
];


export function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="">
      <h2 className="heading pt-10 text-primary">CONTACT US</h2>
      <div className="mx-auto relative min-h-[300px] max-lg:min-h-[200px] max-md:min-h-[100px] max-sm:min-h-[70px] bg-center bg-no-repeat overflow-hidden w-full bg-cover">
        <div className='absolute bg-[url("/contact-bg.png")] bg-no-repeat bg-bottom w-full bg-contain h-full bottom-0' />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto grid grid-cols-2 max-md:grid-cols-1 max-md:gap-10 gap-16 my-10 px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#ffe8f2] col-span-2 rounded-2xl p-4 gap-2 items-center flex flex-col">
            <GrOrganization className="text-xl size-12" />
            <h3 className="text-xl font-bold">Head Office</h3>
            <p className="text-lg text-center">
              SCF 71 and 72 1st floor sector 15, <br /> main market Faridabad Haryana-121007
            </p>
          </div>{' '}
          <div className="bg-[#ffe8f2] rounded-2xl p-4 max-md:col-span-2 justify-center items-center flex flex-col">
            <MdEmail className="text-xl size-10" />
            <h3 className="text-xl font-bold">Email</h3>
            <p className="text-lg text-center break-all ">info@perfectbread.com</p>
          </div>
          <div className="bg-[#ffe8f2] rounded-2xl p-4 justify-center max-md:col-span-2 items-center flex flex-col">
            <MdPhone className="text-xl size-10" />
            <h3 className="text-xl font-bold">Phone</h3>
            <p className="text-lg text-center">0129-4871450 / 51</p>
          </div>
          <div className="col-span-2 rounded-2xl">
            <div className="relative h-80 w-full overflow-hidden rounded-lg border-2">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="absolute top-[-60px] left-0 h-[calc(100%+75px)] w-full min-h-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/d/embed?mid=1Fnw2B-B6q68Qpijuzy-UVzb6bWiRay0&ehbc=2E312F&noprof=1"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col h-full gap-10">
          <h4 className="text-3xl font-bold">Get In Touch</h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 *:flex *:flex-col *:gap-1.5 form-group">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" value={form.message} onChange={handleChange} placeholder="Enter your message" rows={5} required />
            </div>
            <div className="flex-row! items-center gap-4!">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-primary w-fit px-10 py-3 text-white rounded-xl text-lg uppercase font-semibold disabled:opacity-60 mt-6 max-md:mt-1"
              >
                {status === 'sending' ? 'Sending…' : 'Submit'}
              </button>
              {status === 'sent' && <span className="text-green-600 font-medium">Email sent successfully!</span>}
              {status === 'error' && <span className="text-red-600 font-medium">Failed to send. Please try again.</span>}
            </div>
          </form>
        </div>
        {/* <div className="col-span-2 max-md:col-span-1">
          <h4 className="text-4xl mb-7 font-bold ml-4">Plant & Manufacturing</h4>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 max-lg:px-12 max-md:px-8 max-sm:py-8 px-20 py-10 rounded-xl gap-8 bg-[#efefef]">
            {locations.map(location => <PlantAndManufacturer key={location.name} {...location} />)}
          </div>
        </div> */}
      </div>
    </section>
  );
}

const PlantAndManufacturer = ({ name, address, phones }) => {
  return (
    <div className="flex gap-6">
      <MdFactory className="text-xl size-24 max-lg:size-16" />
      <div className="flex flex-col gap-2">
        <h5 className="text-xl font-bold">{name}</h5>
        <p className="text-lg">
          {address}
        </p>
        <div className="flex gap-2 items-center">
          <MdPhone className="text-xl size-6" />
          <div className='flex gap-2 flex-wrap [&>a]:border-r-2 [&>a]:last:border-r-0 [&>a]:pr-2'>
            {phones.map(p => <a key={p} href={`tel:${p}`} className="text-lg">{p}</a>)}
          </div>
        </div>
        <button className="bg-primary w-fit mt-4 flex items-center text-white px-5 py-1 rounded-3xl gap-2 text-lg">
          Get Location
          <FaArrowRight className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};
