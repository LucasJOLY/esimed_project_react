interface GiphyResponse {
  data: Array<{
    id: string;
    title: string;
    images: {
      original: {
        url: string;
      };
      fixed_height: {
        url: string;
      };
    };
  }>;
  meta: {
    status: number;
    msg: string;
  };
}

export const searchGifs = async (query: string): Promise<GiphyResponse> => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${encodeURIComponent(query)}&limit=20`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche de GIFs");
  }

  return response.json();
};
