import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDispatchNavigate from "../../hook/useDispatchNavigate";
import { RootState, AppDispatch } from "../../app/store";
import { addPost, clearPost, editPost, getPostById } from "../store/slicePost";
import { useNavigate, useParams } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondayButton";
import GifPicker from "../../components/GifPicker";
import SelectedImage from "../../components/SelectedImage";
import MentionableTextarea from "../../components/MentionableTextarea/MentionableTextarea";
import EmojiPicker from "../../components/EmojiPicker/EmojiPicker";

const AddPost = ({ edit }: { edit?: boolean }) => {
  const dispatchNavigate = useDispatchNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [mentions, setMentions] = useState<number[]>([]);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const post = useSelector((state: RootState) => state.posts.post);
  const intl = useIntl();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPostById({ postId: parseInt(id) }));
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setImageUrl(post.imageUrl);
      setMentions(post.mentions || []);
    }
  }, [post]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit) {
      dispatchNavigate(
        editPost({
          id: post?.id || 0,
          content,
          userId: authUser?.id || 0,
          imageUrl,
          mentions,
        }),
        "/"
      );
    } else {
      dispatchNavigate(
        addPost({
          content,
          userId: authUser?.id || 0,
          imageUrl,
          mentions,
        }),
        "/"
      );
    }
  };

  const handleGifSelect = (url: string) => {
    setImageUrl(url);
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent((prevContent) => prevContent + emoji);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center p-4 border-b ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <SecondaryButton onClick={() => navigate("/")}>
          <FormattedMessage id="addPost.cancel" />
        </SecondaryButton>
        <PrimaryButton onClick={(e: any) => handleSubmit(e)}>
          {edit ? <FormattedMessage id="addPost.edit" /> : <FormattedMessage id="addPost.post" />}
        </PrimaryButton>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        {imageUrl && (
          <SelectedImage
            imageUrl={imageUrl}
            onRemove={() => setImageUrl(undefined)}
            alt="Selected GIF"
          />
        )}
        <MentionableTextarea
          value={content}
          onChange={setContent}
          onMentionsChange={setMentions}
          isDark={isDark}
          placeholder={intl.formatMessage({ id: "addPost.placeholder" })}
        />
        <div className="flex items-center gap-2 mt-2">
          {!imageUrl && (
            <>
              <GifPicker onSelect={handleGifSelect} isDark={isDark} />
              <EmojiPicker onEmojiSelect={handleEmojiSelect} isDark={isDark} />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
