import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const timelineType = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200).error('Description must be less than 200 characters'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'mainImage',
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
