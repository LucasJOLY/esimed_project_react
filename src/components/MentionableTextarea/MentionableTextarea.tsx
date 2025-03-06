import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Follow } from "../../profil/type";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import "./MentionableTextarea.css";

interface MentionableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onMentionsChange: (mentions: number[]) => void;
  isDark: boolean;
  placeholder?: string;
}

const MentionableTextarea: React.FC<MentionableTextareaProps> = ({
  value,
  onChange,
  onMentionsChange,
  isDark,
  placeholder = "",
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const mentionableUsers = useMemo(() => {
    if (!user) return [];

    const followers: Follow[] = user.followers || [];
    const following: Follow[] = user.following || [];

    return followers
      .filter((follower) =>
        following.some((following) => following.followingId === follower.userId)
      )
      .map((follower) => ({
        id: follower.user.id.toString(),
        display: follower.user.username,
      }));
  }, [user]);

  const handleChange = (
    event: { target: { value: string } },
    newValue: string,
    newPlainTextValue: string,
    mentions: Array<{ id: string }>
  ) => {
    onChange(newValue);
    console.log(mentions);
    if (mentions.length > 0) {
      onMentionsChange(mentions.map((mention) => parseInt(mention.id)));
    }
  };

  return (
    <MentionsInput
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`mentions-input ${isDark ? "dark-theme" : "light-theme"}`}
      style={{
        control: {
          backgroundColor: isDark ? "#16181c" : "#ffffff",
          fontSize: 14,
          fontWeight: "normal",
          color: isDark ? "#ffffff" : "#000000",
          minHeight: "200px",
          height: "auto",
        },
        input: {
          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
          borderRadius: "0.5rem",
          padding: "1rem",
          fontSize: 14,
          fontFamily: "Montserrat",
          minHeight: "200px",
          height: "auto",
          resize: "vertical",
        },
        suggestions: {
          list: {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            borderRadius: "0.75rem",
            maxHeight: "12rem",
            overflow: "auto",
            boxShadow: isDark
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            marginTop: "0.5rem",
            padding: "0.5rem",
            color: isDark ? "#ffffff" : "#000000",
          },
          item: {
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            marginBottom: "0.25rem",
            transition: "all 0.2s ease",
            cursor: "pointer",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            "&focused": {
              backgroundColor: isDark ? "#374151" : "#f3f4f6",
              transform: "translateX(4px)",
            },
          },
        },
        highlighter: {
          padding: "1rem",
          minHeight: "200px",
          height: "auto",
        },
      }}
      a11ySuggestionsListLabel="Suggestions de mentions"
      allowSpaceInQuery
      allowSuggestionsAboveCursor
    >
      <Mention
        trigger="@"
        data={mentionableUsers}
        markup="@[__display__](__id__)"
        displayTransform={(id, display) => `@${display}`}
        renderSuggestion={(
          suggestion: SuggestionDataItem,
          search: string,
          highlightedDisplay: React.ReactNode
        ) => (
          <div
            className={`mention-item flex items-center gap-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {highlightedDisplay}
          </div>
        )}
      />
    </MentionsInput>
  );
};

export default MentionableTextarea;
