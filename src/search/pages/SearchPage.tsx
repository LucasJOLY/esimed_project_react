import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPostsThunk, clearSearch, orderPosts } from "../store/sliceSearch";
import PostCard from "../../posts/components/postCard/PostCard";
import { TextField, CircularProgress, Box, InputAdornment } from "@mui/material";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import { FaSearch } from "react-icons/fa";
import FilterComponent from "../../posts/components/FilterComponent";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ? "#" + searchParams.get("q") : "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const dispatch = useDispatch<AppDispatch>();
  const { searchedPosts, loading } = useSelector((state: RootState) => state.search);
  const intl = useIntl();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const [byLikes, setByLikes] = useState(false);
  const [byTimeDesc, setByTimeDesc] = useState(true);

  useEffect(() => {
    if (initialQuery) {
      dispatch(searchPostsThunk({ query: initialQuery }));
    }
  }, [initialQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchPostsThunk({ query: searchQuery }));
      } else {
        dispatch(clearSearch());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    return () => {
      setSearchQuery("");
      dispatch(clearSearch());
    };
  }, []);

  useEffect(() => {
    dispatch(orderPosts({ byLikes, byTimeDesc }));
  }, [byLikes, byTimeDesc]);

  return (
    <div className="mx-auto p-4">
      <TextField
        fullWidth
        variant="outlined"
        placeholder={intl.formatMessage({ id: "search.placeholder" })}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: isDark ? "#202327" : "#f7f9f9",
            "&:hover fieldset": {
              borderColor: "#1d9bf0",
            },
            "& fieldset": {
              borderColor: isDark ? "#333639" : "#cfd9de",
            },
          },
          "& .MuiInputLabel-root": {
            color: isDark ? "#71767b" : "#536471",
          },
          "& input": {
            color: isDark ? "white" : "black",
          },
        }}
        // ajoute une icone de recherche
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

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <div className="space-y-4">
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
              <FormattedMessage id="toast.searchNotFound" values={{ query: searchQuery }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
