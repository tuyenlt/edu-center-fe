import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const AvatarUser = ({ user }) => {
  const initials = user.name?.[0]?.toUpperCase() ?? "?"
  return (
    <Avatar
      className="h-10 w-10 rounded-full overflow-hidden bg-muted"
      aria-label={`${user.name}'s avatar`}
    >
      {/* Use Next.js Image under the hood for performance; fallback will still work */}
      <AvatarImage asChild>
        {user.avatar_url ? (
          <AvatarImage
            src={user.avatar_url}
            alt={`${user.name}'s avatar`}
            loading="lazy"
            className="object-cover"
          />
        ) : (
          <img src="" alt="" />
        )}
      </AvatarImage>
      <AvatarFallback className="text-sm font-medium text-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarUser
