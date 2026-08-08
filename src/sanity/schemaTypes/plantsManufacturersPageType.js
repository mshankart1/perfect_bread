import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { PLANT_FEATURE_ICONS } from '../../lib/plantsManufacturers';

export const plantsManufacturersPageType = defineType({
  name: 'plantsManufacturersPage',
  title: 'Plants & Manufacturers Page',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Manufacturing Units',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Plant & Manufacturing Address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Feature Strip',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: PLANT_FEATURE_ICONS.map(({ title, value }) => ({ title, value })),
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'icon' },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search by company or address',
    }),
    defineField({
      name: 'allStatesLabel',
      title: 'All States Filter Label',
      type: 'string',
      initialValue: 'All States',
    }),
    defineField({
      name: 'allUnitsLabel',
      title: 'All Units Filter Label',
      type: 'string',
      initialValue: 'All Units',
    }),
    defineField({
      name: 'notice',
      title: 'Results Notice',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'emptyState',
      title: 'No Results Message',
      type: 'string',
      initialValue: 'No manufacturing units match your filters.',
    }),
    defineField({
      name: 'directionsLabel',
      title: 'Directions Button Label',
      type: 'string',
      initialValue: 'Get Directions',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Plants & Manufacturers Page' }),
  },
});
