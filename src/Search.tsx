import React, { useState, KeyboardEvent } from "react";

import "./App.css";
// const Results = ({fullresults})=>{
//  return null;  
// }
const Search = () => {
  const [searchtext, setSearchtext] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showresult, setShowresult] = useState(false);
  //const [results, setResults] = useState([]);
  console.log({
    render: suggestions,
  });
  console.log({viewresult: showresult})
  const onSuggestHandler = (text: string) => {
    setSearchtext(`"${text}"`);
    setSuggestions([]);
    searchAZ(`"${text}"`);
  };

  const updateQueryTerm = debounce((qstring: string): void => {
    searchAZ(qstring);
  });

  function debounce(func: any, timeout = 1000) {
    let timer: NodeJS.Timer | undefined = undefined;
    return (text: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(text);
      }, timeout);
    };
  }

  const searchAZ = async (term: string) => {
    //await setSuggestions([]);
    console.log("after clear", suggestions);
    let qbody = JSON.stringify({
      queryType: "full",
      count: true,
      top: 10,
      search: `/.*${term}.*/`,
    });
    let response = await fetch(
      `/indexes/infors-smart-pages-index-at/docs/search?api-version=2021-04-30-Preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "1B09FB11B19CAD26815E39FCA2154CC5",
        },
        body: qbody,
      }
    );
    let finalData = await response.json();
    console.log(finalData);
    //finalData.value[0].documentname
    let docNames = finalData.value.map((item: any) => {
      return item.documentname;
    });
    console.log(docNames);

    console.log({before: suggestions});
    console.log({viewresult: showresult})
    setSuggestions(docNames);
    console.log({after: suggestions});
  };

  const onInputChanged = (event: any ) =>{
    const val = event.target.value;
    setSearchtext(val);
    setShowresult(false);
    updateQueryTerm(val);
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      console.log('Enter pressed');
      setShowresult(true);
    }
  }
  return (
    <div className="container">
        <label>Search Term</label>
        <br />
        <input
          id='az_search_input'
          type="text"
          className=" input"
          style={{ marginTop: 10 }}
          onChange={onInputChanged}
          value={searchtext}
          onKeyPress={handleKeyPress}
          />
        { suggestions.map((documentname: string, index: number) => (
            <div
              key={index}
              className="suggestion  justify-content-md-center"
              onClick={() => onSuggestHandler(documentname)}
            >
              {documentname}
            </div>
          ))}
          {/* <Results fullresult={result} /> */}
    </div>
  );
};

export default Search;
