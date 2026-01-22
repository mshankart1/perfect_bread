import { defineType, defineArrayMember } from 'sanity';
import { ImageIcon } from '@sanity/icons';

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { 
          title: 'H1', 
          value: 'h1', 
          blockEditor: { 
            render: (props) => (
              <h1 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '2.25rem' }}>
                {props.children}
              </h1>
            ) 
          } 
        },
        { 
          title: 'H2', 
          value: 'h2', 
          blockEditor: { 
            render: (props) => (
              <h2 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.875rem' }}>
                {props.children}
              </h2>
            ) 
          } 
        },
        { 
          title: 'H3', 
          value: 'h3', 
          blockEditor: { 
            render: (props) => (
              <h3 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.5rem' }}>
                {props.children}
              </h3>
            ) 
          } 
        },
        { 
          title: 'H4', 
          value: 'h4', 
          blockEditor: { 
            render: (props) => (
              <h4 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.25rem' }}>
                {props.children}
              </h4>
            ) 
          } 
        },
        { 
          title: 'H5', 
          value: 'h5', 
          blockEditor: { 
            render: (props) => (
              <h5 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.125rem' }}>
                {props.children}
              </h5>
            ) 
          } 
        },
        { 
          title: 'H6', 
          value: 'h6', 
          blockEditor: { 
            render: (props) => (
              <h6 style={{ fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1rem' }}>
                {props.children}
              </h6>
            ) 
          } 
        },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strike', value: 'strike' },
          { title: 'Underline', value: 'underline' },
          {
            title: 'Highlight',
            value: 'highlight',
            blockEditor: {
              icon: () => '🌟',
              render: (props) => (
                <div style={{ backgroundColor: 'red', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
                  {props.children}
                </div>
              ),
            },
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
});
