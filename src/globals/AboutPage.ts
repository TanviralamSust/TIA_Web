import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'mission',
      type: 'richText',
    },
    {
      name: 'vision',
      type: 'richText',
    },
    {
      name: 'islamicValues',
      type: 'richText',
      label: 'Islamic Values & Educational Approach',
    },
    {
      name: 'principalMessage',
      type: 'group',
      label: 'Principal / Administration Message',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'message', type: 'richText' },
      ],
    },
  ],
}
