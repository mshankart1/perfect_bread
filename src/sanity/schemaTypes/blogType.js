import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
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
      description: 'The image of the blog',
    }),
    defineField({
      name: 'color',
      type: 'string',
      initialValue: '#000',
      description: 'The color of the blog, in hex code (e.g. "#cb1f2b")',
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
    }),
    defineField({
        name: 'date',
        title: 'Date',
        type: 'date',
        initialValue: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        options: {
          dateFormat: 'DD-MMM-YYYY',
        },
      })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle
      };
    },
  },
});
