import type { GlobalConfig } from 'payload'

export const AcademicsPage: GlobalConfig = {
  slug: 'academics-page',
  label: 'Academics Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description:
          'Add, edit, remove, or reorder academic program sections (e.g. Kindergarten, Quran Studies, Arabic Language).',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText' },
      ],
    },
  ],
}
