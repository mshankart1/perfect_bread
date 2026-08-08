'use client';
import { Timeline } from './ui';

export function JourneySection({ timeline }) {
  return (
    <section id="journey" className="my-10">
      <h2 className="heading text-primary mb-8 max-md:mb-6 max-sm:mb-4 text-center">PERFECT JOURNEY</h2>
      <div className="w-full flex justify-center items-center container mx-auto mb-6">
        <Timeline timeline={timeline || []} />
      </div>
    </section>
  );
}
