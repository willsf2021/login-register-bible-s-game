import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

export const fetchBooks = async () => {
  try {
    const { data } = await api.get("/books");
    return data;
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};

export const fetchChapters = async (bookId) => {
  try {
    const { data } = await api.get(`/book/${bookId}/chapters`);
    return data;
  } catch (error) {
    console.error("Error fetching chapters: ", error);
    throw error;
  }
};

export const fetchVerses = async (bookId, chapterNumber) => {
  try {
    const { data } = await api.get(
      `/book/${bookId}/chapter/${chapterNumber}/verses`
    );
    return data;
  } catch (error) {
    console.error("Error fetching verses: ", error);
    throw error;
  }
};

export const fetchCompleteReference = async (
  bookAbrev,
  chapterNumber,
  verseNumber
) => {
  try {
    const { data } = await api.get(`/verse`, {
      params: {
        q: `${bookAbrev} ${chapterNumber}:${verseNumber}`,
        versao: "ARA",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching verses: ", error);
    throw error;
  }
};
