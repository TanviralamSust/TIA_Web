import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'schoolName', type: 'text', required: true, defaultValue: 'Toronto Islamic Academy' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'phone', type: 'text', required: true, defaultValue: '+1 (647) 954-0445' },
    { name: 'email', type: 'email', required: true, defaultValue: 'info@tiacademy.com' },
    {
      name: 'address',
      type: 'text',
      required: true,
      defaultValue: '3334 Danforth Avenue, Toronto, ON M1L 1C6',
    },
    {
      name: 'officeHours',
      type: 'text',
      defaultValue: 'Monday - Friday: 8:00 AM - 4:00 PM',
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'footerNote',
      type: 'text',
      defaultValue: 'Teach & Learn • Lead & Serve',
    },
  ],
}
