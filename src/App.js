import { useState } from "react";
import "./App.css";

const groupByLanguage = ({ languages, results }) => {
  let groupedByLanguage = {};
  languages.forEach((language) => {
    const filteredByLanguage = results.filter(
      (item) => item.language === language
    );
    groupedByLanguage = {
      ...groupedByLanguage,
      [language]: filteredByLanguage,
    };
  });
  return groupedByLanguage;
};

const getLanguages = ({ results }) => [
  ...new Set(results.map((item) => item.language)),
];

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query) {
      setLoading(true);
      setError("");
      fetch(
        `https://api.github.com/search/repositories?q="${query}"&per_page=1000`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setError("Error: " + response.status);
          }
        })
        .then((json) => {
          setTotalCount(json.total_count);
          if (json.items) {
            const filteredResult = json.items.filter((item) => item.language);
            const languages = getLanguages({ results: filteredResult });
            const groupedByLanguage = groupByLanguage({
              languages,
              results: filteredResult,
            });
            const descendingLanguage = languages.sort(
              (a, b) =>
                groupedByLanguage[b].length - groupedByLanguage[a].length
            );
            const finalResult = descendingLanguage.map((language) => ({
              [language]: groupedByLanguage[language].length,
            }));
            setResult(finalResult);
          }
          if (json.message) {
            setError(json.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };
  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1>Holly Health Test</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onInputChange}
          placeholder="Search for a repository"
        />
        <input
          className="submitButton"
          disabled={loading}
          type="submit"
          value={loading ? "Loading..." : "Go"}
        />
      </form>
      {error && <span>{error}</span>}
      {result.length ? (
        <>
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {result.map((language) => {
                  const name = Object.keys(language)[0];
                  const count = Object.values(language)[0];
                  return (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <span>{totalCount} result(s) found</span>
        </>
      ) : null}
    </div>
  );
}

export default App;
