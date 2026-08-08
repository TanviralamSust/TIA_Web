import fs from 'fs'
import path from 'path'

// Minimal .env loader so this standalone script (run via tsx, not Next) picks up local config.
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([\w.-]+)\s*=\s*(.*)?$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2] || ''
    }
  }
}

async function seed() {
  const { getPayload } = await import('payload')
  const config = (await import('../payload.config')).default
  const { richText } = await import('./richText')

  const payload = await getPayload({ config })

  payload.logger.info('Seeding Toronto Islamic Academy starter content...')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      introText: richText([
        "We're dedicated to nurturing the next generation of youth to excel in Islamic and academic studies, blending deep spiritual insight with rigorous academic study in a vibrant, inclusive community.",
        'Our mission is to inspire and empower students to become well-rounded individuals who contribute positively to society, rooted in the values of faith, integrity, and excellence. We offer a holistic education that fosters intellectual curiosity, spiritual growth, and a strong sense of purpose.',
      ]),
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      intro: richText([
        'Toronto Islamic Academy is a K-8 school where academic excellence and Islamic values grow together. From Junior Kindergarten through Grade 8, we provide a nurturing environment where students build strong character alongside a rigorous, Ontario-curriculum education.',
      ]),
      mission: richText([
        'To inspire and empower students to become well-rounded individuals who contribute positively to society, rooted in the values of faith, integrity, and excellence.',
      ]),
      vision: richText([
        'A community of confident, knowledgeable, and compassionate young Muslims who lead with strong character, deep faith, and academic excellence.',
      ]),
      islamicValues: richText([
        'Islamic teachings are integrated into everyday learning, from daily prayers to Quranic principles woven throughout our subjects. Students learn to apply their faith across every part of their lives, alongside a full Ontario curriculum.',
      ]),
    },
  })

  await payload.updateGlobal({
    slug: 'admissions-page',
    data: {
      overview: richText([
        'We are excited to welcome new students and their families into our vibrant community. Our admissions process is designed to be smooth and supportive, ensuring that every child finds their place in our nurturing environment where Islamic values and academic excellence come together.',
      ]),
      programsOffered: [
        { name: 'Junior & Senior Kindergarten (JK/SK)', description: 'Early learning that builds a strong foundation in literacy, numeracy, and Islamic practice.' },
        { name: 'Elementary (Grades 1-4)', description: 'Core academic subjects paired with a deepening understanding of Islamic values.' },
        { name: 'Middle School (Grades 5-8)', description: 'Critical thinking, leadership, and a deepening engagement with Islamic studies.' },
      ],
      requirements: richText([
        'Please contact our admissions office to confirm current requirements for your child\'s grade level. Generally, we ask for proof of age, previous school records (if applicable), and immunization records.',
      ]),
      requiredDocuments: [
        { name: "Completed School Registration Form" },
        { name: 'Student Medical Form' },
        { name: 'Parental Agreement' },
        { name: "Proof of child's age (birth certificate or passport)" },
        { name: 'Previous school records, if applicable' },
      ],
      tuitionInfo: richText([
        'Tuition varies by grade level. Please contact our admissions office for current fee details and payment plan options.',
      ]),
    },
  })

  await payload.updateGlobal({
    slug: 'academics-page',
    data: {
      intro: richText([
        'At Toronto Islamic Academy, our programs from Junior Kindergarten (JK) to Grade 8 provide an education that balances academic knowledge with Islamic teachings, nurturing both the mind and spirit.',
      ]),
      sections: [
        {
          title: 'Early Learning: JK & SK',
          description: richText([
            'In Junior and Senior Kindergarten, we introduce young learners to the joys of education and Islamic practices. Our curriculum encourages early development in reading, writing, math, and Quranic studies, creating a strong base for lifelong learning.',
          ]),
        },
        {
          title: 'Elementary School (Grades 1-8)',
          description: richText([
            'Students build on core academic subjects such as English, Math, and Science, while deepening their understanding of Islamic values. As students progress into the middle grades, the curriculum advances to emphasize critical thinking, problem-solving, and leadership skills.',
          ]),
        },
        {
          title: 'Ontario Curriculum',
          description: richText([
            'Our academic program follows the Ontario curriculum, ensuring students receive a well-rounded education recognized across the province.',
          ]),
        },
        {
          title: 'Quran Studies',
          description: richText([
            'Students engage in daily Quran memorization and recitation, building a lasting connection to the Quran alongside proper tajweed.',
          ]),
        },
        {
          title: 'Islamic Studies',
          description: richText([
            'Islamic teachings are integrated into everyday learning, covering Islamic history, fiqh, and akhlaq (character), helping students apply their faith across all areas of life.',
          ]),
        },
        {
          title: 'Arabic Language',
          description: richText([
            'Students develop Arabic language skills to deepen their understanding of the Quran and Islamic texts.',
          ]),
        },
        {
          title: 'Other School Programs',
          description: richText([
            'Additional enrichment activities and programs are offered throughout the year. Contact the school office for the current schedule.',
          ]),
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'donate-page',
    data: {
      intro: richText([
        'Your donation helps us provide a nurturing, high-quality Islamic and academic education for every student at Toronto Islamic Academy. Every contribution, big or small, supports our classrooms, teachers, and school programs.',
      ]),
      etransferInstructions: richText([
        'You may also donate via e-transfer to info@tiacademy.com. Please include your name and phone number in the transfer message so we can send you a receipt.',
      ]),
    },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      intro: "We'd love to hear from you. Reach out with any questions about admissions, academics, or how to get involved.",
    },
  })

  payload.logger.info('Seed complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
