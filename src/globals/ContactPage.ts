import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      defaultValue: "We'd love to hear from you. Reach out with any questions.",
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps Embed URL',
      admin: {
        description:
          'Go to Google Maps -> Share -> Embed a map -> copy the "src" URL from the iframe code.',
      },
      defaultValue:
        'https://www.google.com/maps?q=3334+Danforth+Avenue,+Toronto,+ON+M1L+1C6&output=embed',
    },
  ],
}
