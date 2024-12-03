import { useState, useEffect } from "react";
import {
  fetchBooks,
  fetchChapters,
  fetchVerses,
  fetchCompleteReference,
} from "src/services/apiBiblia";
import Container from "./styles";
import { Paragraph } from "src/components/Paragraph/index";

export const BibleRef = ({ isReferenceComplete, setFieldValue }) => {
  const [books, setBooks] = useState([]);


  
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);

  const [reference, setReference] = useState("");
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

    setQuery(() => ({
      abrev: selectedBook?.abrev || "",
      bookId: bookId,
      chapterNumber: "",
      verseNumber: "",
    }));

    setChapters([]);
    setVerses([]);
    setFieldValue("referencia", "");
  };

  useEffect(() => {
    if (!query.bookId) return;

    fetchChapters(query.bookId).then((total) => {
      total = Number(total);
      const temp = [];
      for (let i = 1; i <= total; i++) {
        temp.push(i);
      }
      setChapters(temp);
    });
  }, [query.bookId]);

  const handleChapter = (event) => {
    const chapterNumber = event.target.value;

    setQuery((prevState) => {
      const updatedQuery = {
        ...prevState,
        chapterNumber: chapterNumber,
        verseNumber: "",
      };

      setFieldValue(
        "referencia",
        `${updatedQuery.abrev} ${updatedQuery.chapterNumber}`
      );

      return updatedQuery;
    });

    setVerses([]);
  };

  useEffect(() => {
    if (!query.chapterNumber || !query.bookId || isReferenceComplete === "RLC")
      return;

    fetchVerses(query.bookId, query.chapterNumber).then((total) => {
      total = Number(total);
      const temp = [];
      for (let i = 1; i <= total; i++) {
        temp.push(i);
      }
      setVerses(temp);
    });
  }, [query.chapterNumber]);

  const handleVerse = (event) => {
    const verseNumber = event.target.value;

    setQuery((prevState) => {
      const updatedQuery = {
        ...prevState,
        verseNumber: verseNumber,
      };

      setFieldValue(
        "referencia",
        `${updatedQuery.abrev} ${updatedQuery.chapterNumber}:${updatedQuery.verseNumber}`
      );
      return updatedQuery;
    });
  };
  useEffect(() => {
    if (
      !query.bookId ||
      !query.chapterNumber ||
      !query.verseNumber ||
      isReferenceComplete === "RLC"
    )
      return;
    fetchCompleteReference(
      query.abrev,
      query.chapterNumber,
      query.verseNumber
    ).then((response) => {
      setReference(response[0]?.texto || "");
    });
  }, [query]);

  return (
    <Container>
      <select name="books" id="books" onChange={handleBook}>
        <option value="">Selecione um livro...</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.nome}
          </option>
        ))}
      </select>
      <select name="chapters" id="chapters" onChange={handleChapter}>
        <option value="">Selecione um capítulo...</option>
        {chapters.map((chapter) => (
          <option key={chapter} value={chapter}>
            {chapter}
          </option>
        ))}
      </select>
      {isReferenceComplete === "RLC" ? (
        ""
      ) : (
        <>
          <select name="verses" id="verses" onChange={handleVerse}>
            <option value="">Selecione um versículo...</option>
            {verses.map((verse) => (
              <option key={verse} value={verse}>
                {verse}
              </option>
            ))}
          </select>

          <div>
            <Paragraph content={reference ? `"${reference}"` : ""} />
          </div>
        </>
      )}
    </Container>
  );
};
