import UserAvatar from "./UserAvatar";
/* returns an array of useAvatars given an array of emails */
interface IProps {
  userEmails: string[];
  size?: "small" | "medium" | "large";
}
export default function AvatarList({ userEmails, size }: IProps) {
  return (
    <div className="flex">
      {userEmails.map((email, i) => (
        <div key={i} className="-mx-1">
          <UserAvatar size={size} border={true} userEmail={email} />
        </div>
      ))}
    </div>
  );
}
