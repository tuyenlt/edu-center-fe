import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { stringToColorClass } from "@/utils";
import { useNavigate } from "react-router-dom";

const AvatarUser = ({ user, className = "", fallbackTextClass = "" }) => {
  const navigate = useNavigate();
  let initials = user.name?.slice(0, 2).toUpperCase() ?? "?";
  const fallbackColorClass = stringToColorClass(user.name ?? "User");
  return (
    <Avatar
      className={`h-12 w-12 rounded-full bg-muted ${className} cursor-pointer border-2 `}
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

      <AvatarFallback
        className={`text-sm font-medium ${fallbackTextClass} text-foreground ${fallbackColorClass}`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
