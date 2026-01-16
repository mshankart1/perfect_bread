import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const bannerType = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Banner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
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
        },
      ],
      description:
        'You can add multiple images at once by clicking "Upload" and selecting several files in the file picker dialog.',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'First Banner', value: 'first_banner' },
          { title: 'Second Banner', value: 'second_banner' },
          { title: 'Team Section Banner', value: 'team_section' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.0',
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
