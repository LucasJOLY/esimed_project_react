import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPostsThunk, searchUsersThunk, clearSearch, orderPosts } from "../store/sliceSearch";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { useSearchParams } from "react-router";
import SearchBar from "../components/SearchBar";
import SearchTabs from "../components/SearchTabs";
import SearchContent from "../components/SearchContent";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ? "#" + searchParams.get("q") : "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { searchedPosts, searchedUsers, loading } = useSelector((state: RootState) => state.search);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const [byLikes, setByLikes] = useState(false);
  const [byTimeDesc, setByTimeDesc] = useState(true);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      if (activeTab === 0) {
        dispatch(searchPostsThunk({ query }));
      } else {
        dispatch(searchUsersThunk({ query }));
      }
    } else {
      dispatch(clearSearch());
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeTab]);

  useEffect(() => {
    return () => {
      setSearchQuery("");
      dispatch(clearSearch());
    };
  }, []);

  useEffect(() => {
    dispatch(orderPosts({ byLikes, byTimeDesc }));
  }, [byLikes, byTimeDesc]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    handleSearch(searchQuery);
  };

  return (
    <div className="mx-auto p-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDark={isDark} />
      <SearchTabs activeTab={activeTab} handleTabChange={handleTabChange} isDark={isDark} />
      <SearchContent
        loading={loading}
        activeTab={activeTab}
        searchedPosts={searchedPosts}
        searchedUsers={searchedUsers}
        searchQuery={searchQuery}
        byLikes={byLikes}
        setByLikes={setByLikes}
        byTimeDesc={byTimeDesc}
        setByTimeDesc={setByTimeDesc}
      />
    </div>
  );
};

export default SearchPage;
