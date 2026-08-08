import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Staff } from './collections/Staff'
import { Activities } from './collections/Activities'
import { AdmissionInquiries } from './collections/AdmissionInquiries'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { AdmissionsPage } from './globals/AdmissionsPage'
import { AcademicsPage } from './globals/AcademicsPage'
import { DonatePage } from './globals/DonatePage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Toronto Islamic Academy Admin',
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Staff, Activities, AdmissionInquiries, ContactSubmissions],
  globals: [SiteSettings, HomePage, AboutPage, AdmissionsPage, AcademicsPage, DonatePage, ContactPage],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    seoPlugin({
      collections: ['activities'],
      globals: ['home-page', 'about-page', 'admissions-page', 'academics-page', 'donate-page', 'contact-page'],
      uploadsCollection: 'media',
    }),
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
})
