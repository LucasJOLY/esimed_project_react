import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDispatchNavigate from "../../hook/useDispatchNavigate";
import { RootState, AppDispatch } from "../../app/store";
import { addPost, editPost, getPostById } from "../store/slicePost";
import { useNavigate, useParams } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondayButton";
const AddPost = ({ edit }: { edit?: boolean }) => {
  const dispatchNavigate = useDispatchNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [content, setContent] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
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
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit) {
      dispatchNavigate(
        editPost({
          id: post?.id || 0,
          content,
          userId: user?.id || 0,
        }),
        "/"
      );
    } else {
      dispatchNavigate(
        addPost({
          content,
          userId: user?.id || 0,
        }),
        "/"
      );
    }
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
          {edit ? (
            <FormattedMessage id="addPost.edit" />
          ) : (
            <FormattedMessage id="addPost.post" />
          )}
        </PrimaryButton>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={intl.formatMessage({ id: "addPost.placeholder" })}
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
    </div>
  );
};

export default AddPost;
