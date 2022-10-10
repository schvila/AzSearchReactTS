import { useEffect, useState } from 'react';
import RelationshipGrid from './components/RelationshipGrid';
import ResultGrid from './components/search/ResultGrid';
import SearchAsync from './components/search/SearchAsync';
import IAZDocument from './interfaces/IAZDocument';
import IRelationships from './interfaces/IRelationships';
import { GetRelationships } from './RelationshipControllerApi';
function RelationshipApp() {
  const [results, setResults] = useState<IAZDocument[]>([]);

  const [relationships, setRelationships] = useState<IRelationships[]>([]);
  console.log(window.location);
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await GetRelationships();
      if (mounted) {
        // only try to update if we are subscribed (or mounted)
        setRelationships(res);
      }
    })();
    return () => {
      mounted = false;
    }; // cleanup function
  }, []);

  // (async () => {
  //   const res = await GetRelationships();
  //   setRelationships(res);
  //   console.log('setRelationships')
  // })();
  const ReloadRelationships = async () => {
    const res = await GetRelationships();
    setRelationships(res);
  };

  return (
    <div>
      <div>
        <SearchAsync setResults={setResults} />
      </div>
      <div>
        <ResultGrid reloadRelationships={ReloadRelationships} results={results} />
      </div>
      <div>
        <RelationshipGrid relationships={relationships} reloadRelationships={ReloadRelationships} />
      </div>
    </div>
  );
}

export default RelationshipApp;
