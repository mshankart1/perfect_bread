import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { GrOrganization } from 'react-icons/gr';
import { MdEmail, MdPhone, MdFactory } from 'react-icons/md';

export function ContactSection() {
  return (
    <section id="contact" className="">
      <h2 className="heading pt-10">CONTACT US</h2>
      <div className="mx-auto relative min-h-[350px] bg-[url('/contact-bg.png')] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-10 my-10 px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-fuchsia-200 col-span-2 rounded-2xl p-4 gap-2 items-center flex flex-col">
            <GrOrganization className="text-xl size-12" />
            <h3 className="text-xl font-bold">Head Office</h3>
            <p className="text-lg text-center">
              SCF 71/72 1st floor sector 15, <br /> main market faridabad Haryana-121007
            </p>
          </div>
          <div className="bg-fuchsia-200 rounded-2xl p-4 justify-center items-center flex flex-col">
            <MdEmail className="text-xl size-10" />
            <h3 className="text-xl font-bold">Email</h3>
            <p className="text-lg text-center">info@perfectbread.com</p>
          </div>
          <div className="bg-fuchsia-200 rounded-2xl p-4 justify-center items-center flex flex-col">
            <MdPhone className="text-xl size-10" />
            <h3 className="text-xl font-bold">Phone</h3>
            <p className="text-lg text-center">0129-4871451</p>
          </div>
          <div className="col-span-2 rounded-2xl">
            <div className="w-full border-2 h-70 rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.2331883945!2d77.314064!3d28.3952889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc4e3ff33fdf%3A0x4409dbaf3e788db1!2sPerfect%20Bake!5e0!3m2!1sen!2sin!4v1700000000000"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col h-full gap-10">
          <h4 className="text-3xl font-bold">Get In Touch</h4>
          <form className="flex flex-col gap-6 *:flex *:flex-col *:gap-2 form-group">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Enter your message" rows={5} />
            </div>
            <button
              type="submit"
              className="bg-primary w-fit px-10 py-3 text-white rounded-xl text-lg uppercase font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-span-2">
          <h4 className="text-4xl mb-7 font-bold ml-4">Plant & Manufacturing</h4>
          <div className="grid grid-cols-2 px-20 py-10 rounded-xl gap-8 bg-gray-300">
            <PlantAndManufacturer />
            <PlantAndManufacturer />
            <PlantAndManufacturer />
            <PlantAndManufacturer />
          </div>
        </div>
      </div>
    </section>
  );
}

const PlantAndManufacturer = () => {
  return (
    <div className="flex gap-6">
      <MdFactory className="text-xl size-16" />
      <div className="flex flex-col gap-2">
        <h5 className="text-xl font-bold">L.R. Food Pvt. Ltd.</h5>
        <p className="text-lg">
          Indira complex, industrial area, sector-87 <br /> greater faridabad, Haryana-121007
        </p>
        <div className="flex gap-2 items-center">
          <MdPhone className="text-xl size-6" />
          <p className="text-lg">0129-4871451 | +91 92509 22830</p>
        </div>
        <button className="bg-primary w-fit flex items-center text-white px-5 py-1 rounded-3xl gap-2 text-lg">
          Get Location
          <FaArrowRight className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};
