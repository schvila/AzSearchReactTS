import SearchAsync from './components/search/SearchAsync';
import ResultGrid from './components/search/ResultGrid';
import React from 'react';
import IAZDocument from './interfaces/IAZDocument';
import {AddRelations} from './RelationshipControllerApi';
import RelationshipGrid from './components/RelationshipGrid';
function  RelationshipApp() {
  console.log('async call to add relations');
  
  (async () => {
    var t = await AddRelations();
    console.log({asyncres: t});
    
  })();
    
  
  const defMargin = 10;
  const [results, setResults] = React.useState<IAZDocument[]>([]);
  const [reload, setReload] = React.useState<boolean>(true);
  //GetRelationships();

  return (
    <div 
    >
        <div>
          <SearchAsync setResults={setResults} />
        </div>
        <div>
        <ResultGrid results={results} />
        </div>
        <div>
          <RelationshipGrid reload={reload} />
        </div>
   </div>
  );
}

export default RelationshipApp;
