import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const AvatarUser = ({ user, className = "" }) => {
  const navigate = useNavigate();
  let initials = user.name?.charAt(0).toUpperCase() ?? "?";
  return (
    <Avatar
      className={`h-10 w-10 rounded-full bg-muted ${className} cursor-pointer`}
      aria-label={`${user.name ?? "User"}'s avatar`}
      onClick={() => navigate(`/users/${user._id}`)}
    >
      {/* Try to load the image; onError → fallback */}
      {user.avatar_url && (
        <AvatarImage
          src={user.avatar_url}
          alt={`${user.name}'s avatar`}
          loading="lazy"
          className="object-cover"
        />
      )}

      <AvatarFallback className="text-sm font-medium text-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
