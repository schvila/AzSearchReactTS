import SearchAsync from './components/search/SearchAsync';
import ResultGrid from './components/search/ResultGrid';
import React, {useEffect, useState} from 'react';
import IAZDocument from './interfaces/IAZDocument';
import {AddRelations, GetRelationships} from './RelationshipControllerApi';
import RelationshipGrid from './components/RelationshipGrid';
import IRelationships from './interfaces/IRelationships';
function  RelationshipApp() {

  const defMargin = 10;
  const [results, setResults] = useState<IAZDocument[]>([]);
  const [reload, setReload] = useState<boolean>(true);

  const [relationships, setRelationships] = useState<IRelationships[]>([]);  
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await GetRelationships();
      if (mounted) {
        // only try to update if we are subscribed (or mounted)
        setRelationships(res);
      }
    })();
    return () =>{ mounted = false; }// cleanup function    
    },[]);  
  
  // (async () => {
  //   const res = await GetRelationships();
  //   setRelationships(res);
  //   console.log('setRelationships')
  // })();
    const  ReloadRelationships = async () => {
      const res = await GetRelationships();
      setRelationships(res);
    }

  return (
    <div 
    >
        <div>
          <SearchAsync setResults={setResults} />
        </div>
        <div>
        <ResultGrid results={results} reloadRelationships={ReloadRelationships}/>
        </div>
        <div>
          <RelationshipGrid relationships={relationships} reloadRelationships={ReloadRelationships} />
        </div>
   </div>
  );
}

export default RelationshipApp;
