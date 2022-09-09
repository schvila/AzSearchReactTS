import SearchAsync from './SearchAsync';
import ResultGrid from './ResultGrid';
import React from 'react';
import IAZDocument from './IAZDocument';

function App() {
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

export default App;
