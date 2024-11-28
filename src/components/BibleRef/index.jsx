import { useState, useEffect } from "react";
import { fetchBooks, fetchChapters, fetchVerses } from "src/services/apiBiblia";
import Container from "./styles";

export const BibleRef = ({ isReferenceComplete }) => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [query, setQuery] = useState({
    bookId: "",
    abrev: "",
    chapterNumber: "",
    verseNumber: "",
  });
  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
    });
  }, []);

  const handleBook = (event) => {
    const bookId = event.target.value;
    const selectedBook = books.find((book) => book.id == bookId);
    setQuery(() => {
      return {
        abrev: selectedBook.abrev,
        bookId: bookId,
        chapterNumber: "",
        verseNumber: "",
      };
    });
  };

  useEffect(() => {
    if (!query.bookId) return;
    console.log(query);

    fetchChapters(query.bookId).then((total) => {
      total = Number(total);
      const temp = [];
      for (let i = 1; i <= total; i++) {
        temp.push(i);
      }
      setChapters(temp);
    });
  }, [query]);

  const handleChapter = (event) => {
    const chapterNumber = event.target.value;
    setQuery((prevState) => {
      return {
        ...prevState,
        chapterNumber: chapterNumber,
      };
    });
  };

  useEffect(() => {
    if (!query.chapterNumber || !query.bookId || isReferenceComplete == "RLC")
      return;
    fetchVerses(query.bookId, query.chapterNumber).then((total) => {
      total = Number(total);
      const temp = [];
      for (let i = 1; i <= total; i++) {
        temp.push(i);
      }
      setVerses(temp);
    });
  }, [query]);

  const handleVerse = (event) => {
    const verseNumber = event.target.value;
    setQuery((prevState) => {
      return {
        ...prevState,
        verseNumber: verseNumber,
      };
    });
  };
  return (
    <Container>
      <select name="books" id="books" onChange={handleBook}>
        <option value="">Selecione um livro...</option>
        {books.map((book) => {
          return (
            <option key={book.id} value={book.id}>
              {book.nome}
            </option>
          );
        })}
      </select>
      <select name="chapters" id="chapters" onChange={handleChapter}>
        <option value="">Selecione um capítulo...</option>
        {chapters.map((chapter) => {
          return (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          );
        })}
      </select>
      {isReferenceComplete == "RLC" ? (
        ""
      ) : (
        <select name="verses" id="verses" onChange={handleVerse}>
          <option value="">Selecione um versículo...</option>
          {verses.map((verse) => {
            return (
              <option key={verse} value={verse}>
                {verse}
              </option>
            );
          })}
        </select>
      )}
    </Container>
  );
};
