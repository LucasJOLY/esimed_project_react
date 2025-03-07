import { InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { useIntl } from "react-intl";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDark: boolean;
}

const SearchBar = ({ searchQuery, setSearchQuery, isDark }: SearchBarProps) => {
  const intl = useIntl();

  return (
    <CustomTextField
      fullWidth
      variant="outlined"
      placeholder={intl.formatMessage({ id: "search.placeholder" })}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      isDark={isDark}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: isDark ? "white" : "black" }}>
              <FaSearch />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
