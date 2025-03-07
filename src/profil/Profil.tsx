import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../app/store";
import { User } from "../auth/types";
import { AppDispatch } from "../app/store";
import { getUserById, resetUserById } from "../auth/store/slice";
import { CircularProgress } from "@mui/material";
import { clearPosts, getLikedPostsByUserId, getPostsByUserId } from "../posts/store/slicePost";
import { fetchFavorites } from "../posts/store/sliceFavorites";
import ProfileHeader from "./components/ProfileHeader";
import FollowPopover from "./components/FollowPopover";
import ProfilePosts from "./components/ProfilePosts";

function Profil() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [actualUser, setActualUser] = useState({} as User);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const userById = useSelector((state: RootState) => state.auth.userById);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const loadingRepost = useSelector((state: RootState) => state.reposts.repostLoading);
  const loadingFavorites = useSelector((state: RootState) => state.favorites.loading);
  const [byLikes, setByLikes] = useState(false);
  const [byTimeDesc, setByTimeDesc] = useState(true);

  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(0);
    return () => {
      dispatch(resetUserById());
      dispatch(clearPosts());
      setValue(0);
    };
  }, []);

  useEffect(() => {
    if (loadingRepost === "succeeded") {
      getPosts();
    }
  }, [loadingRepost]);

  useEffect(() => {
    if (value === 2 && loadingFavorites === "succeeded") {
      loadFavorites();
    }
  }, [loadingFavorites]);

  const loadFavorites = () => {
    dispatch(fetchFavorites({ userId: actualUser.id, byLikes, byTimeDesc }));
  };

  const [anchorElFollowers, setAnchorElFollowers] = useState<null | HTMLElement>(null);
  const [anchorElFollowing, setAnchorElFollowing] = useState<null | HTMLElement>(null);
  const handleClickFollowers = (event: React.MouseEvent<HTMLElement>) => {
    if (actualUser.id == authUser?.id && followerCount > 0) {
      setAnchorElFollowers(event.currentTarget);
    }
  };

  const handleCloseFollowers = () => {
    setAnchorElFollowers(null);
  };

  const handleClickFollowing = (event: React.MouseEvent<HTMLElement>) => {
    if (actualUser.id == authUser?.id && followCount > 0) {
      setAnchorElFollowing(event.currentTarget);
    }
  };
  const handleCloseFollowing = () => {
    setAnchorElFollowing(null);
  };

  const openFollowing = Boolean(anchorElFollowing);
  const openFollowers = Boolean(anchorElFollowers);

  useEffect(() => {
    if (authUser && id && authUser.id == Number(id)) {
      dispatch(getUserById(authUser.id));
    } else if (id) {
      dispatch(getUserById(Number(id)));
    }
    if (!id) {
      dispatch(getUserById(authUser?.id || 0));
    }
  }, [id]);

  useEffect(() => {
    if (userById) {
      setActualUser(userById);
    }
  }, [userById]);

  useEffect(() => {
    getPosts();
  }, [actualUser, byLikes, byTimeDesc, value]);

  const getPosts = () => {
    if (actualUser?.id) {
      if (value === 0) {
        dispatch(getPostsByUserId({ user: actualUser, byLikes, byTimeDesc }));
      } else if (value === 1) {
        dispatch(
          getLikedPostsByUserId({
            user: actualUser,
            byLikes: byLikes,
            byTimeDesc: byTimeDesc,
          })
        );
      } else if (value === 2 && authUser?.id === actualUser.id) {
        loadFavorites();
      }
    }
  };

  useEffect(() => {
    setFollowCount(actualUser?.following?.length || 0);
    setFollowerCount(actualUser?.followers?.length || 0);
  }, [actualUser]);

  return actualUser && actualUser?.id ? (
    <div>
      <div>
        <ProfileHeader
          actualUser={actualUser}
          user={authUser}
          isDark={isDark}
          followCount={followCount}
          followerCount={followerCount}
          handleClickFollowing={handleClickFollowing}
          handleClickFollowers={handleClickFollowers}
          setFollowerCount={setFollowerCount}
        />

        <FollowPopover
          open={openFollowing}
          onClose={handleCloseFollowing}
          title="following_list"
          users={actualUser.following || []}
          isDark={isDark}
        />

        <FollowPopover
          open={openFollowers}
          onClose={handleCloseFollowers}
          title="followers_list"
          users={actualUser.followers || []}
          isDark={isDark}
        />

        <ProfilePosts
          value={value}
          handleChange={handleChange}
          isDark={isDark}
          posts={value === 2 ? favorites.map((f) => f.post) : posts}
          byLikes={byLikes}
          setByLikes={setByLikes}
          byTimeDesc={byTimeDesc}
          setByTimeDesc={setByTimeDesc}
          showFavoritesTab={authUser?.id === actualUser.id}
          authUser={authUser!}
          currentUser={actualUser}
        />
      </div>
    </div>
  ) : (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default Profil;
