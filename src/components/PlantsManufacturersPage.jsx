'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MdFactory, MdInfoOutline } from 'react-icons/md';
import {
  DEFAULT_PLANT_CERTIFICATION,
  PLANT_FEATURE_ICON_PATHS,
  PLANT_FEATURE_SUBTITLES,
} from '@/lib/plantsManufacturers';

const ALL = 'all';

function DetailRow({ label, value }) {
  if (!value) return null;

  return (
    <div className="grid grid-cols-[minmax(9.5rem,11.5rem)_1fr] gap-x-3 text-[0.92rem] leading-6 text-[#2c211d] sm:grid-cols-[minmax(11.5rem,13rem)_1fr] sm:text-[0.95rem]">
      <dt className="font-semibold text-[#2c211d]">
        {label} <span aria-hidden="true">:</span>
      </dt>
      <dd className="wrap-break-word text-[#3a2f2a]">{value}</dd>
    </div>
  );
}

function resolveCertification(plant, pageDefault) {
  if (typeof plant.certification === 'string') {
    return plant.certification.trim();
  }

  return (pageDefault || DEFAULT_PLANT_CERTIFICATION).trim();
}

export function PlantsManufacturersPage({ page, plants }) {
  const [search, setSearch] = useState('');
  const [state, setState] = useState(ALL);
  const [unit, setUnit] = useState(ALL);

  const states = useMemo(
    () => [...new Set(plants.map((plant) => plant.state).filter(Boolean))].sort(),
    [plants],
  );
  const units = useMemo(
    () => [...new Set(plants.map((plant) => plant.unitLabel).filter(Boolean))].sort(),
    [plants],
  );

  const visiblePlants = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();

    return plants.filter((plant) => {
      const certification = resolveCertification(plant, page.defaultCertification);
      const searchableText = [
        plant.companyName,
        plant.state,
        plant.productionCenter,
        plant.address,
        certification,
        plant.licenseText,
        plant.unitLabel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();

      return (
        (!term || searchableText.includes(term)) &&
        (state === ALL || plant.state === state) &&
        (unit === ALL || plant.unitLabel === unit)
      );
    });
  }, [plants, search, state, unit, page.defaultCertification]);

  return (
    <main className="bg-[#fff8ee] font-poppins text-[#2c211d]">
      {page.features?.length > 0 && (
        <section
          aria-label="Manufacturing highlights"
          className="relative z-10 mx-auto -mt-5 max-w-6xl px-4 sm:-mt-9 sm:px-6 lg:-mt-11"
        >
          <div className="grid grid-cols-1 overflow-hidden rounded-[10px] bg-white py-2 shadow-[0_10px_28px_rgba(80,40,20,0.1)] sm:grid-cols-2 lg:grid-cols-4 lg:py-1">
            {page.features.map((feature, index) => {
              const iconPath = PLANT_FEATURE_ICON_PATHS[feature.icon];
              const subtitle = PLANT_FEATURE_SUBTITLES[feature.icon];
              const isFreshDispatch = feature.icon === 'fresh-dispatch';

              return (
                <div
                  key={feature._key || `${feature.icon}-${index}`}
                  className="relative flex items-center gap-3 px-5 py-4 sm:px-4 lg:px-5 lg:py-5"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 hidden h-[52%] w-px -translate-y-1/2 bg-[#e6e0da] lg:block"
                    />
                  )}
                  {index % 2 === 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 hidden h-[52%] w-px -translate-y-1/2 bg-[#e6e0da] sm:block lg:hidden"
                    />
                  )}
                  {iconPath && (
                    <span
                      className={`grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg sm:size-12 ${
                        isFreshDispatch
                          ? 'border border-[#f0ece8] bg-[#fafafa]'
                          : 'bg-[#ffe4e4]'
                      }`}
                    >
                      <Image
                        src={iconPath}
                        alt=""
                        width={40}
                        height={40}
                        className="size-8 object-contain sm:size-9"
                      />
                    </span>
                  )}
                  <div className="min-w-0 text-left">
                    <p className="text-[0.92rem] font-bold leading-tight text-[#2a2420] sm:text-[0.95rem]">
                      {feature.label}
                    </p>
                    {subtitle && (
                      <p className="mt-0.5 text-[0.75rem] leading-snug text-[#8a8178] sm:text-[0.8rem]">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section id="explore-plants" className="mx-auto max-w-6xl px-4 py-11 sm:px-6 lg:py-14">
        <header className="mx-auto max-w-3xl text-center">
          {page.eyebrow && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {page.eyebrow}
            </p>
          )}
          <h2 className="font-impact text-3xl uppercase tracking-wide text-[#2c211d] sm:text-4xl md:text-[2.75rem]">
            {page.title}
          </h2>
          {page.intro && (
            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[#6a5a51] sm:text-base">
              {page.intro}
            </p>
          )}
        </header>

        <div className="mt-8 grid gap-3 md:grid-cols-[1.7fr_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Search plants</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={page.searchPlaceholder}
              className="h-12 w-full rounded-lg border border-[#e0d2bc] bg-white px-4 text-sm text-[#2c211d] outline-none transition placeholder:text-[#9a8b80] focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="block">
            <span className="sr-only">Filter by state</span>
            <select
              value={state}
              onChange={(event) => setState(event.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-[#e0d2bc] bg-white bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat px-3 pr-9 text-sm text-[#2c211d] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236a5a51' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")",
              }}
            >
              <option value={ALL}>{page.allStatesLabel}</option>
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Filter by unit</span>
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-[#e0d2bc] bg-white bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat px-3 pr-9 text-sm text-[#2c211d] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236a5a51' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")",
              }}
            >
              <option value={ALL}>{page.allUnitsLabel}</option>
              {units.map((unitName) => (
                <option key={unitName} value={unitName}>
                  {unitName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-md border border-[#f0c5c8] border-l-[5px] border-l-primary bg-[#fff5f5] px-4 py-3 text-sm leading-6 text-[#6a4548]">
          <MdInfoOutline aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>
            <span className="font-bold text-primary">Note:</span>{' '}
            {page.notice ||
              'For manufacturing unit address and FSSAI Lic. No., please verify the latest details with the unit or on the FSSAI portal.'}
          </p>
        </div>

        <div className="mt-7 space-y-5" aria-live="polite">
          {visiblePlants.length > 0 ? (
            visiblePlants.map((plant) => {
              const productionCenter = plant.productionCenter || plant.address;
              const showAddress =
                Boolean(plant.productionCenter) &&
                Boolean(plant.address) &&
                plant.productionCenter.trim() !== plant.address.trim();
              const certification = resolveCertification(
                plant,
                page.defaultCertification,
              );

              return (
                <article
                  key={plant._id}
                  className="rounded-xl border border-[#e8d9c4] bg-white shadow-[0_8px_24px_rgba(80,40,20,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#f0e4d4] px-5 py-4 sm:px-6">
                    <h3 className="flex min-w-0 items-center gap-3 text-base font-bold uppercase tracking-wide text-[#2c211d] sm:text-lg">
                      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-white">
                        <MdFactory aria-hidden="true" className="size-5" />
                      </span>
                      <span className="wrap-break-word">{plant.companyName}</span>
                    </h3>
                    {plant.unitLabel && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        {plant.unitLabel}
                      </span>
                    )}
                  </div>

                  <div className="px-5 py-5 sm:px-6">
                    <dl className="space-y-2.5">
                      <DetailRow label="State" value={plant.state} />
                      <DetailRow label="Production Center" value={productionCenter} />
                      {showAddress && <DetailRow label="Address" value={plant.address} />}
                      <DetailRow label="Certification" value={certification} />
                      <DetailRow label="FSSAI Lic. No." value={plant.licenseText} />
                    </dl>

                    {plant.mapUrl && (
                      <>
                        <div className="mt-5 border-t border-[#f0e4d4]" />
                        <a
                          href={plant.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a91721] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          {page.directionsLabel}
                        </a>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-[#d9c7aa] bg-white px-6 py-14 text-center text-[#6a5a51]">
              {page.emptyState}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
