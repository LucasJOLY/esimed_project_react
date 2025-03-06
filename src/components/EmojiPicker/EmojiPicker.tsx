import React, { useState } from "react";
import EmojiPickerReact from "emoji-picker-react";
import { IconButton } from "@mui/material";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { Theme } from "emoji-picker-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isDark: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, isDark }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject: any) => {
    onEmojiSelect(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <IconButton
        onClick={() => setShowPicker(!showPicker)}
        sx={{ color: "#1d9bf0", border: "1px solid #1d9bf0" }}
      >
        <MdOutlineEmojiEmotions />
      </IconButton>
      {showPicker && (
        <div className="absolute z-50 top-full left-[-400%] mt-2">
          <EmojiPickerReact
            onEmojiClick={onEmojiClick}
            searchPlaceholder="Rechercher un emoji..."
            theme={isDark ? Theme.DARK : Theme.LIGHT}
            skinTonesDisabled
            lazyLoadEmojis
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
