export const DEFAULT_PLANT_CERTIFICATION =
  'AN ISO 9001:2015 & HACCP CERTIFIED COMPANY';

export const PLANT_FEATURE_ICONS = [
  {
    title: 'Manufacturing Network',
    value: 'manufacturing-network',
    path: '/plants-%26-manufacturers/Manufacturing-Network.png',
    subtitle: 'Multiple production units',
  },
  {
    title: 'Quality Focused',
    value: 'quality-focused',
    path: '/plants-%26-manufacturers/Quality-focused.png',
    subtitle: 'Care in every loaf',
  },
  {
    title: 'Fresh Dispatch',
    value: 'fresh-dispatch',
    path: '/plants-%26-manufacturers/Fresh-Dispatch.png',
    subtitle: 'Production-to-market journey',
  },
  {
    title: 'Plant Locator',
    value: 'plant-locator',
    path: '/plants-%26-manufacturers/Plant-Locator.png',
    subtitle: 'State & unit-code filters',
  },
  {
    title: 'Easy Plant Finder',
    value: 'easy-plant-finder',
    path: '/plants-%26-manufacturers/Easy-plant-finder.png',
    subtitle: 'Locate units quickly',
  },
  {
    title: 'Quality Information',
    value: 'quality-information',
    path: '/plants-%26-manufacturers/Quality-Information.png',
    subtitle: 'Certification details where available',
  },
  {
    title: 'FSSAI Details',
    value: 'fssai-details',
    path: '/plants-%26-manufacturers/FSSAI-details.png',
    subtitle: 'Licensed & compliant',
  },
];

export const PLANT_FEATURE_ICON_PATHS = Object.fromEntries(
  PLANT_FEATURE_ICONS.map(({ value, path }) => [value, path]),
);

export const PLANT_FEATURE_SUBTITLES = Object.fromEntries(
  PLANT_FEATURE_ICONS.map(({ value, subtitle }) => [value, subtitle]),
);
