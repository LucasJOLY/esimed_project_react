import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage, useIntl } from "react-intl";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { addComment } from "../store/sliceComment";
import { User } from "../../auth/types";
const AddComment = ({ postId }: { postId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [content, setContent] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addComment({
        postId,
        user: user ?? ({} as User),
        content,
      })
    );
  };

  return (
    <div className="mb-2">
      <form onSubmit={handleSubmit} className="pr-4 pt-4 pl-4 pb-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={intl.formatMessage({ id: "addComment.placeholder" })}
          className={`w-full h-48 p-4 resize-none outline-none rounded-lg ${
            isDark
              ? "bg-[#16181c] text-white border border-gray-800"
              : "bg-white text-black border border-gray-200"
          }`}
          style={{
            fontFamily: "Montserrat",
          }}
        />
      </form>
      <div className={`flex justify-end items-center pr-4`}>
        <PrimaryButton onClick={(e: any) => handleSubmit(e)}>
          <FormattedMessage id="addComment.addComment" />
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddComment;
