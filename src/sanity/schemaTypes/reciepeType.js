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
      validation: (Rule) => Rule.required().max(250).error('Description must be less than 200 characters'),
      description: 'Max 250 characters.',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'The URL of the recipe',
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
      name: 'sort',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
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
