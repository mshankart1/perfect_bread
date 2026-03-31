import { defineType, defineArrayMember } from 'sanity';
import { ColorWheelIcon, ImageIcon } from '@sanity/icons';
import { TextColorAnnotation } from '../components/TextColorAnnotation';
import { TextColorSwatchInput } from '../components/TextColorSwatchInput';
import { TEXT_COLOR_PALETTE } from '../constants/textColorPalette';

const editorBlockReset = {
  margin: 0,
  padding: 0,
};

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
        {
          title: 'Normal',
          value: 'normal',
          blockEditor: {
            render: (props) => (
              <p style={{ ...editorBlockReset, fontSize: '1rem' }}>
                {props.children}
              </p>
            ),
          },
        },
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
              <h2 style={{...editorBlockReset, fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.875rem' }}>
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
              <h4 style={{...editorBlockReset, fontWeight: props.markDefs?.some(d => d._type === 'strong') ? 'bold' : 'normal', fontSize: '1.25rem' }}>
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
        {
          title: 'Quote',
          value: 'blockquote',
          blockEditor: {
            render: (props) => (
              <blockquote style={{ ...editorBlockReset, fontSize: '1rem' }}>
                {props.children}
              </blockquote>
            ),
          },
        },
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
          {
            title: 'Text color',
            name: 'textColor',
            type: 'object',
            icon: ColorWheelIcon,
            components: {
              annotation: TextColorAnnotation,
            },
            fields: [
              {
                title: 'Color',
                name: 'hex',
                type: 'string',
                initialValue: '#e53935',
                options: {
                  list: TEXT_COLOR_PALETTE,
                },
                components: {
                  input: TextColorSwatchInput,
                },
                validation: (Rule) =>
                  Rule.required().custom((val) => {
                    if (!val || /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(val)) {
                      return true;
                    }
                    return 'Use a valid hex color (e.g. #ff0000)';
                  }),
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
