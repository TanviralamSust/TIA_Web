import type { CollectionConfig } from 'payload'
import { sendNotificationEmail } from '@/lib/sendNotificationEmail'

export const AdmissionInquiries: CollectionConfig = {
  slug: 'admission-inquiries',
  labels: {
    singular: 'Admission Inquiry',
    plural: 'Admission Inquiries',
  },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['parentName', 'studentName', 'gradeApplyingFor', 'submittedAt', 'read'],
    description: 'Submissions from the Admissions page inquiry form.',
  },
  access: {
    // Created only via the server-side route handler (src/app/(frontend)/admissions/actions.ts),
    // never directly through the public REST/GraphQL API.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'parentName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'studentName', type: 'text', required: true },
    { name: 'studentAge', type: 'text', required: true, label: 'Student Age / Grade' },
    { name: 'gradeApplyingFor', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
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
          subject: `New Admission Inquiry: ${doc.studentName}`,
          lines: [
            { label: 'Parent/Guardian', value: doc.parentName },
            { label: 'Email', value: doc.email },
            { label: 'Phone', value: doc.phone },
            { label: 'Student Name', value: doc.studentName },
            { label: 'Student Age/Grade', value: doc.studentAge },
            { label: 'Grade Applying For', value: doc.gradeApplyingFor },
            { label: 'Message', value: doc.message || '(none)' },
          ],
        })
      },
    ],
  },
}
