import React, {useState, useEffect} from 'react';
import './App.css';

const Search = () => {
    const [term, setTerm] = useState("");

    useEffect(() => {
        const search = async () => {
          let response = await fetch(`/indexes/infors-smart-pages-index-at/docs?api-version=2021-04-30-Preview&search=*`,
          {
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '76AF4AE4C1993685E45276275282D949',
            }
        }
        );
          let finalData = await response.json();
          console.log(finalData);
        }
        if(term){
            search();
        }
      }, [term])    
      return(
        <div>
            <label>Search Term</label>
            <br/>
            <input id='SearchInput' value={term} onChange={e=>setTerm(e.target.value)} />
        </div>
      )
};

export default Search;