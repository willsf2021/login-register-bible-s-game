import axios from "axios";

const URL = "https://biblia.filipelopes.me/api/v1/biblia/";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`/api/books`);
    return response.data;
  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
};

export const fetchChapters = async (bookId) => {
  try {
    const response = await axios.get(`/api/book/${bookId}/chapters`);
    return response.data;
  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
};

export const fetchVerses = async (bookId, chapterNumber) => {
  try {
    const response = await axios.get(
      `/api/book/${bookId}/chapter/${chapterNumber}/verses`
    );
    return response.data;
  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
};
