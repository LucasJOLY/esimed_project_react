import { Button, Typography } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ExpandableContentProps {
  content: string;
  isDark: boolean;
  maxLength?: number;
}

const ExpandableContent = ({ content, isDark, maxLength = 280 }: ExpandableContentProps) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();

  const renderContent = (text: string) => {
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const parts = text.split(hashtagRegex);
    const matches = text.match(hashtagRegex) || [];

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {matches[index] && (
          <span
            key={`hashtag-${index}`}
            onClick={(e) => {
              e.stopPropagation();
              const hashtag = matches[index].slice(1);
              navigate(`/search?q=${hashtag}`);
            }}
            className="cursor-pointer text-[#1d9bf0] hover:underline"
          >
            {matches[index]}
          </span>
        )}
      </span>
    ));
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
