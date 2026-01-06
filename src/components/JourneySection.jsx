'use client';
import { useEffect, useState } from 'react';
import { Heading, Timeline } from './ui';

export function JourneySection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      const response = await fetch('/api/timeline');
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchTimelineData();
  }, []);

  return (
    <section id="journey" className="my-10">
      <h2 className="heading text-primary mb-8 text-center">OUR JOURNEY</h2>
      <div className="w-full flex justify-center items-center container mx-auto mb-6">
        <Timeline data={data} />
      </div>
    </section>
  );
}
