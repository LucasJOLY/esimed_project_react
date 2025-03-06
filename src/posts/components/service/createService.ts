export const isContentValid = (content: string): boolean => {
  return content.length <= 280;
};

export const isNotEmpty = (content: string): boolean => {
  return content.trim().length > 0;
};

export const extractHashtags = (content: string): string[] => {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  const hashtags = content.match(hashtagRegex) || [];
  return hashtags.map((tag) => tag.slice(1)); // Enlever le # du début
};
