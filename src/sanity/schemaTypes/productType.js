import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

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
      name: 'heading',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
    }),
    defineField({
      name: 'redirectUrl',
      type: 'url',
      title: 'Redirect URL',
      description: 'The URL to redirect to when the clicked on the buy now button',
    }),
    defineField({
      name: 'nutritionalInformation',
      title: 'Nutritional Information',
      type: 'array',
      of: [
        defineField({
          name: 'nutritional_information',
          title: 'Nutritional Information',
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'quantity', type: 'string', title: 'Quantity' },
          ],
        }),
      ],
      options: {
        layout: 'table',
      },
      description: 'Add any nutritional info label and value. Click "Add item" for more rows.',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      description: 'Product color, enter a color name or hex code (e.g. "red" or "#ff0000")',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'blockContent',
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Bun & Pav', value: 'bun & pav' },
          { title: 'Flat Bread', value: 'flat bread' },
          { title: 'Health And Wellness', value: 'health & wellness' },
          { title: 'Rusk', value: 'rusk' },
          { title: 'Sweet Bakery', value: 'sweet bakery' },
          { title: 'White Bread', value: 'white bread' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'weight',
      type: 'string',
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
      subtitle: 'category',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle || 'No category',
        media: media,
      };
    },
  },
});
