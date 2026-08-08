import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Join the Community of Modern Thinking Students',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'A school of moral excellence is our primary objective, where the complete personal development of the student is paramount.',
    },
    {
      name: 'introHeading',
      type: 'text',
      defaultValue: 'Welcome to Toronto Islamic Academy',
    },
    {
      name: 'introText',
      type: 'richText',
    },
  ],
}
