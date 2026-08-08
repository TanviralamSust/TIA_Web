import type { GlobalConfig } from 'payload'

export const AdmissionsPage: GlobalConfig = {
  slug: 'admissions-page',
  label: 'Admissions Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'overview',
      type: 'richText',
    },
    {
      name: 'programsOffered',
      type: 'array',
      labels: { singular: 'Program', plural: 'Programs' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'requirements',
      type: 'richText',
      label: 'Admission Requirements',
    },
    {
      name: 'requiredDocuments',
      type: 'array',
      labels: { singular: 'Document', plural: 'Documents' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'tuitionInfo',
      type: 'richText',
      label: 'Tuition Information',
    },
  ],
}
