import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { User } from "../../auth/types";
import UserPopUp from "../../components/UserPopUp";
import { useNavigate } from "react-router";
interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const navigate = useNavigate();

  return (
    <div
      className={`mb-4 p-4 cursor-pointer border-b ${
        isDark
          ? "bg-black text-white border-gray-800 hover:bg-[#16181c]"
          : "bg-white text-black border-gray-200 hover:bg-gray-100"
      }`}
      onClick={() => {
        navigate(`/profile/${user.id}`);
      }}
    >
      <div className="flex items-center space-x-4">
        <UserPopUp userId={user.id} />
        <div>
          <Typography variant="h6" component="div">
            {user.username}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
