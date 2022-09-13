import SearchAsync from './components/search/SearchAsync';
import ResultGrid from './components/search/ResultGrid';
import React from 'react';
import IAZDocument from './interfaces/IAZDocument';

function SearchApp() {
  const defMargin = 10;
  const [results, setResults] = React.useState<IAZDocument[]>([]);

  return (
    <div style={{marginLeft: defMargin, marginRight: defMargin, marginTop: defMargin}}
    >
        <div>
          <SearchAsync setResults={setResults} />
        </div>
        <div>
        <ResultGrid results={results} />
        </div>
   </div>
  );
}

export default SearchApp;
