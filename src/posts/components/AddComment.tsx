import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage, useIntl } from "react-intl";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { addComment } from "../store/sliceComment";
import { User } from "../../auth/types";
import GifPicker from "../../components/GifPicker";
import SelectedImage from "../../components/SelectedImage";
import MentionableTextarea from "../../components/MentionableTextarea/MentionableTextarea";
import EmojiPicker from "../../components/EmojiPicker/EmojiPicker";

const AddComment = ({ postId }: { postId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [mentions, setMentions] = useState<number[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addComment({
        postId,
        user: user ?? ({} as User),
        content,
        imageUrl,
        mentions,
      })
    );
    setContent("");
    setImageUrl(undefined);
    setMentions([]);
  };

  const handleGifSelect = (url: string) => {
    setImageUrl(url);
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent((prevContent) => prevContent + emoji);
  };

  return (
    <div className="mb-2">
      <form onSubmit={handleSubmit} className="pr-4 pt-4 pl-4 pb-2">
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
          placeholder={intl.formatMessage({ id: "addComment.placeholder" })}
        />
      </form>
      <div className={`flex justify-between items-center px-4 mt-2`}>
        <div className="flex gap-2">
          {!imageUrl && (
            <>
              <GifPicker onSelect={handleGifSelect} isDark={isDark} />
              <EmojiPicker onEmojiSelect={handleEmojiSelect} isDark={isDark} />
            </>
          )}
        </div>

        <PrimaryButton onClick={(e: any) => handleSubmit(e)}>
          <FormattedMessage id="addComment.addComment" />
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddComment;
