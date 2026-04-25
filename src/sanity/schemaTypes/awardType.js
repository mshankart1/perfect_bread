import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const awardType = defineType({
  name: 'award',
  title: 'Awards & Achievements',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
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
      description: 'Image of the award or achievement',
    }),
    defineField({
      name: 'organization',
      type: 'string',
      title: 'Awarding Organization',
      description: 'Who gave this award?',
    }),
    defineField({
      name: 'date',
      title: 'Date Received',
      type: 'date',
      initialValue: new Date().toISOString().split('T')[0],
      options: {
        dateFormat: 'DD-MMM-YYYY',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      media: 'image',
    },
  },
});
