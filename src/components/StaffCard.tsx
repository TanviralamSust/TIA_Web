import { MediaImage } from './MediaImage'

type StaffMember = {
  name: string
  title: string
  bio?: string | null
  email?: string | null
  photo?: unknown
}

export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden bg-forest-100">
        {member.photo ? (
          <MediaImage
            media={member.photo as never}
            size="card"
            fallbackAlt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-forest-300">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-bold text-forest-900">{member.name}</h3>
        <p className="text-sm font-semibold text-gold-600">{member.title}</p>
        {member.bio && <p className="mt-2 flex-1 text-sm text-forest-700">{member.bio}</p>}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-3 text-sm font-medium text-forest-600 hover:text-forest-800"
          >
            {member.email}
          </a>
        )}
      </div>
    </div>
  )
}
