import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate, useLocation } from "react-router";
import { FormattedMessage } from "react-intl";
import { IconButton, Typography, Badge } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { IoNotifications, IoNotificationsSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const { notifications } = useSelector((state: RootState) => state.notifications);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { path: "/", icon: AiFillHome, label: "nav.home" },
    {
      path: "/notifications",
      icon: unreadCount > 0 ? IoNotificationsSharp : IoNotifications,
      label: "nav.notifications",
      badge: unreadCount,
    },
    { path: `/search`, icon: FaSearch, label: "nav.search" },
    { path: `/profile`, icon: BsPersonFill, label: "nav.profile" },
  ];

  return (
    <>
      <div
        className={`md:hidden z-10 border-t ${
          isDark ? "bg-[#16181c] border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <IconButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                color: isActive(item.path) ? "#1d9bf0" : isDark ? "white" : "black",
              }}
            >
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  <item.icon size={24} />
                </Badge>
              ) : (
                <item.icon size={24} />
              )}
            </IconButton>
          ))}
        </div>
      </div>

      {/* Version desktop (side navbar) */}
      <div
        className={`hidden md:flex flex-col gap-4 fixed left-0 h-screen w-64 p-4 border-r ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-3 rounded-full cursor-pointer ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
            }  ${
              isActive(item.path)
                ? "text-[#1d9bf0] font-bold"
                : isDark
                ? "text-white"
                : "text-black"
            }`}
          >
            {item.badge ? (
              <Badge badgeContent={item.badge} color="error">
                <item.icon size={24} />
              </Badge>
            ) : (
              <item.icon size={24} />
            )}
            <Typography className="text-lg font-medium">
              <FormattedMessage id={item.label} />
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
