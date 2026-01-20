import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import DynamicTableInput from '../components/DynamicTableLayout';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'nutrition',
      title: 'Nutritional Information',
    },
    {
      name: 'media',
      title: 'Media & Images',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'heading',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      group: 'basic',
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'basic',
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
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'blockContent',
      group: 'content',
    }),
    // defineField({
    //   name: 'nutritionalInformation',
    //   title: 'Nutritional Information',
    //   type: 'array',
    //   group: 'nutrition',
    //   of: [
    //     defineField({
    //       name: 'nutritional_information',
    //       title: 'Nutritional Information',
    //       type: 'object',
    
    //       options: {
    //         editModal: 'inline', // 👈 THIS removes popup
    //       },
    
    //       fieldsets: [
    //         {
    //           name: 'row',
    //           options: { columns: 3 }
    //         }
    //       ],
    
    //       fields: [
    //         { name: 'name', type: 'string', title: 'Name', fieldset: 'row' },
    //         { name: 'quantity', type: 'string', title: 'Quantity', fieldset: 'row' },
    //         { name: 'rta', type: 'string', title: 'Contribution to RDA', fieldset: 'row' },
    //       ],
    
    //       preview: {
    //         select: {
    //           name: 'name',
    //           subtitle: 'quantity',
    //         },
    //         prepare({ name, subtitle }) {
    //           return {
    //             title: name,
    //             subtitle: subtitle,
    //           };
    //         },
    //       },
    //     }),
    //   ],
    //   description: 'Add any nutritional info label and value. Click "Add item" for more rows.',
    // }),
    defineField({
      name: 'nutritionalInformation',
      title: 'Nutritional Information Table',
      type: 'array',
      group: 'nutrition',
    
      components: {
        input: DynamicTableInput
      },
    
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'quantity', title: 'Quantity', type: 'string' },
            { name: 'rta', title: 'Contribution to RDA', type: 'string' }
          ]
        }
      ],
      description: 'Add nutritional values row by row',
    }),

    defineField({
      name: 'nutriInfo',
      title: 'Nutritional Information',
      type: 'text',
      group: 'nutrition',
      description: 'Additional nutritional information in a text format',
    }),
    
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      group: 'media',
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
      name: 'color',
      type: 'string',
      title: 'Color',
      group: 'settings',
      description: 'Product color, enter a color name or hex code (e.g. "red" or "#ff0000")',
    }),
    defineField({
      name: 'redirectUrl',
      type: 'url',
      title: 'Redirect URL',
      group: 'settings',
      description: 'The URL to redirect to when the clicked on the buy now button',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'settings',
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
