import type { GlobalConfig } from 'payload'

export const DonatePage: GlobalConfig = {
  slug: 'donate-page',
  label: 'Donate Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'suggestedAmounts',
      type: 'array',
      labels: { singular: 'Amount', plural: 'Amounts' },
      minRows: 1,
      defaultValue: [{ amount: 25 }, { amount: 50 }, { amount: 100 }, { amount: 250 }],
      fields: [{ name: 'amount', type: 'number', required: true, min: 1 }],
    },
    {
      name: 'etransferInstructions',
      type: 'richText',
      label: 'E-Transfer Instructions (optional)',
    },
  ],
}
