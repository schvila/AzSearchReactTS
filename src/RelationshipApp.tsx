import SearchAsync from './components/search/SearchAsync';
import ResultGrid from './components/search/ResultGrid';
import React from 'react';
import IAZDocument from './interfaces/IAZDocument';
import GetRelationships from './RelationshipControllerApi';

function RelationshipApp() {
  const defMargin = 10;
  const [results, setResults] = React.useState<IAZDocument[]>([]);
  GetRelationships();

  return (
    <div 
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

export default RelationshipApp;
