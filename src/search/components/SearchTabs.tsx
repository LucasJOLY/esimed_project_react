import { Tabs, Tab } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface SearchTabsProps {
  activeTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  isDark: boolean;
}

const SearchTabs = ({ activeTab, handleTabChange, isDark }: SearchTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      centered
      variant="fullWidth"
      sx={{
        width: "100%",
        marginTop: 2,
        marginBottom: 2,
        borderBottom: 1,
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
        "& .MuiTab-root": {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          "&.Mui-selected": {
            color: isDark ? "white" : "primary.main",
          },
          textTransform: "none",
          fontSize: "1rem",
        },
      }}
    >
      <Tab label={<FormattedMessage id="search.posts" />} />
      <Tab label={<FormattedMessage id="search.users" />} />
    </Tabs>
  );
};

export default SearchTabs;
