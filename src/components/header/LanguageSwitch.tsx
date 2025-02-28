import { IconButton, Popover, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setLanguage } from "../../language/store/slice";
import { FR, GB } from 'country-flag-icons/react/3x2'
import { FaLanguage } from "react-icons/fa6";
import { useState } from "react";

const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
    window.location.reload();
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: isDark ? 'white' : 'black' }}>
        <FaLanguage size={24} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ 
          p: 1, 
          backgroundColor: isDark ? '#16181c' : 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Box 
            onClick={() => handleLanguageChange('fr')}
            sx={{ 
              p: 1,
              cursor: 'pointer',
              border: language === 'fr' ? `1px solid ${isDark ? 'white' : 'black'}` : 'none',
              borderRadius: 1,
              '&:hover': { backgroundColor: isDark ? '#202327' : '#f5f5f5' }
            }}
          >
            <FR width={24} />
          </Box>
          <Box 
            onClick={() => handleLanguageChange('en')}
            sx={{ 
              p: 1,
              cursor: 'pointer',
              border: language === 'en' ? `1px solid ${isDark ? 'white' : 'black'}` : 'none',
              borderRadius: 1,
              '&:hover': { backgroundColor: isDark ? '#202327' : '#f5f5f5' }
            }}
          >
            <GB width={24} />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default LanguageSwitch;