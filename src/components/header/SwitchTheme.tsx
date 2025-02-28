import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleTheme } from "../../theme/store/slice";
import { GiMoon } from "react-icons/gi";
import { GoSun } from "react-icons/go";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className="flex items-center justify-center">
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          color: isDark ? "white" : "black"
        }}
      >
        {isDark ? <GoSun /> : <GiMoon />}
      </IconButton>
    </div>
  );
};

export default SwitchTheme;
