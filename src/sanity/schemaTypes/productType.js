import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
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
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Bun And Pav', value: 'Bun And Pav' },
          { title: 'Flat Bread', value: 'Flat Bread' },
          { title: 'Health And Wellness', value: 'Health And Wellness' },
          { title: 'Rusk', value: 'Rusk' },
          { title: 'Sweet Bread', value: 'Sweet Bread' },
          { title: 'White Bread', value: 'White Bread' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'weight',
      type: 'string',
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
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
