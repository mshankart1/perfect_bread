import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const recipeType = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'card_color',
      type: 'string',
      title: 'Card Color',
      description: 'The color of the card, in hex code (e.g. #ff0000) that will be displayed on the recipe page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200).error('Description must be less than 200 characters'),
      description: 'Max 200 characters.',
    }),
    defineField({
      name: 'banner_images',
      type: 'array',
      title: 'Banner Images',
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
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
