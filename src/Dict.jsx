import { useState } from "react";
import Axios from "axios";

export default function Dict() {
  const [words, setWords] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const searchWords = async () => {
    try {
      if (search === "") {
        setError("Search field cannot be empty.");
        return;
      }
      const response = await Axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      setWords(response.data);
      setError("");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const toggleInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const renderDefinitions = () => {
    if (words) {
      return words[0].meanings.map((word) => (
        <div>
          <p>{word.partOfSpeech}</p>
          <ul>
            {word.definitions.map((word) => (
              <div>
                <p>{word.definition}</p>
              </div>
            ))}
          </ul>
        </div>
      ));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={toggleInput}
        placeholder="Enter any word: "
      />
      <button onClick={searchWords}>Click to reveal!</button>
      <div>{error && <p>{error}</p>}</div>
      <div>{renderDefinitions()}</div>
    </div>
  );
}
