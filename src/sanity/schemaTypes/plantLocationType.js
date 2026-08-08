import { PinIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const plantLocationType = defineType({
  name: 'plantLocation',
  title: 'Plant Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'unitLabel',
      title: 'Unit Label',
      type: 'string',
      description: 'For example: Unit 01',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productionCenter',
      title: 'Production Center',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certification',
      title: 'Certification',
      type: 'string',
      description:
        'Shown on the plant card between Production Center and FSSAI. Example: AN ISO 9001:2015 & HACCP CERTIFIED COMPANY',
      initialValue: 'AN ISO 9001:2015 & HACCP CERTIFIED COMPANY',
    }),
    defineField({
      name: 'licenseText',
      title: 'FSSAI / License Text',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).warning('Enter a complete Google Maps or map-provider URL.'),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Inactive locations are hidden from the website.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: 'companyName', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'companyName',
      unit: 'unitLabel',
      state: 'state',
    },
    prepare({ title, unit, state }) {
      return {
        title,
        subtitle: [unit, state].filter(Boolean).join(' · '),
      };
    },
  },
});
