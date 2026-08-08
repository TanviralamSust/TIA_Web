import type { CollectionConfig } from 'payload'
import { sendNotificationEmail } from '@/lib/sendNotificationEmail'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'submittedAt', 'read'],
    description: 'Submissions from the Contact page form.',
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'submittedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
      defaultValue: () => new Date().toISOString(),
    },
    { name: 'read', type: 'checkbox', defaultValue: false },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        await sendNotificationEmail({
          subject: `New Contact Message from ${doc.name}`,
          lines: [
            { label: 'Name', value: doc.name },
            { label: 'Email', value: doc.email },
            { label: 'Phone', value: doc.phone || '(none)' },
            { label: 'Message', value: doc.message },
          ],
        })
      },
    ],
  },
}
