import { Button, Typography } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface ExpandableContentProps {
  content: string;
  isDark: boolean;
  maxLength?: number;
  mentions?: number[];
}

const ExpandableContent = ({
  content,
  isDark,
  maxLength = 280,
  mentions = [],
}: ExpandableContentProps) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.authUser);

  const renderContent = (text: string) => {
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;

    // Remplacer les mentions par des espaces pour éviter les conflits avec le regex des hashtags
    const textWithSpaces = text.replace(mentionRegex, " @[$1]($2) ");

    const parts = textWithSpaces.split(hashtagRegex);
    const hashtagMatches = textWithSpaces.match(hashtagRegex) || [];
    const mentionMatches = text.match(mentionRegex) || [];

    return parts.map((part, index) => {
      // Traiter les mentions dans chaque partie
      const mentionParts = part.split(/(@\[[^\]]+\]\(\d+\))/g);

      return (
        <span key={index}>
          {mentionParts.map((mentionPart, mentionIndex) => {
            const mentionMatch = mentionPart.match(/@\[([^\]]+)\]\((\d+)\)/);
            if (mentionMatch) {
              const display = mentionMatch[1];
              const userId = parseInt(mentionMatch[2]);
              const isCurrentUser = userId === currentUser?.id;

              return (
                <span
                  key={`mention-${mentionIndex}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${userId}`);
                  }}
                  className={`cursor-pointer hover:underline ${
                    isCurrentUser ? "text-red-500" : "text-[#1d9bf0]"
                  }`}
                >
                  @{display}
                </span>
              );
            }
            return mentionPart;
          })}
          {hashtagMatches[index] && (
            <span
              key={`hashtag-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                const hashtag = hashtagMatches[index].slice(1);
                navigate(`/search?q=${hashtag}`);
              }}
              className="cursor-pointer text-[#1d9bf0] hover:underline"
            >
              {hashtagMatches[index]}
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div>
      <Typography
        className="mt-1"
        sx={{
          color: isDark ? "white" : "black",
          overflowWrap: "anywhere",
        }}
      >
        {content.length > maxLength ? (
          <>
            {showFullContent
              ? renderContent(content)
              : renderContent(content.slice(0, maxLength) + "...")}
          </>
        ) : (
          renderContent(content)
        )}
      </Typography>
      {content.length > maxLength && (
        <div className="w-full flex justify-center mt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullContent(!showFullContent);
            }}
            className="!rounded-full !px-2 !py-1 "
            sx={{
              textTransform: "none",
              color: isDark ? "#1d9bf0" : "#1976d2",
              padding: "4px",
              minWidth: "auto",
              gap: "10px",
            }}
          >
            {showFullContent ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            <FormattedMessage id={showFullContent ? "post.seeLess" : "post.seeMore"} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableContent;
