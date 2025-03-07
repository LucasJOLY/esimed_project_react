import { Box, CircularProgress, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import PostCard from "../../posts/components/postCard/PostCard";
import UserCard from "./UserCard";
import FilterComponent from "../../posts/components/FilterComponent";

interface SearchContentProps {
  loading: boolean;
  activeTab: number;
  searchedPosts: any[];
  searchedUsers: any[];
  searchQuery: string;
  byLikes: boolean;
  setByLikes: (value: boolean) => void;
  byTimeDesc: boolean;
  setByTimeDesc: (value: boolean) => void;
}

const SearchContent = ({
  loading,
  activeTab,
  searchedPosts,
  searchedUsers,
  searchQuery,
  byLikes,
  setByLikes,
  byTimeDesc,
  setByTimeDesc,
}: SearchContentProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="space-y-4">
      {activeTab === 0 ? (
        <>
          {searchedPosts.length > 0 && (
            <div className="flex justify-end items-center mt-4">
              <FilterComponent
                filterByLikes={byLikes}
                setFilterByLikes={setByLikes}
                filterByTime={byTimeDesc}
                setFilterByTime={setByTimeDesc}
              />
            </div>
          )}
          {searchedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {searchedPosts.length === 0 && searchQuery && (
            <div className="text-center text-gray-500">
              <Typography>
                <FormattedMessage id="toast.searchNotFound" values={{ query: searchQuery }} />
              </Typography>
            </div>
          )}
        </>
      ) : (
        <>
          {searchedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          {searchedUsers.length === 0 && searchQuery && (
            <div className="text-center text-gray-500">
              <FormattedMessage id="toast.usersNotFound" values={{ query: searchQuery }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchContent;
