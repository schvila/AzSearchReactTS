import React, { useState } from "react";
import "./App.css";

const Search = () => {
  //const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
console.log({render:suggestions});
  const onSuggestHandler = (text: string) => {
    //setText(text);
    setSuggestions([]);
  };

  const updateQueryTerm = debounce((term: string): void => {
    setSuggestions([]);
    searchAZ(term);
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
  //useEffect(() => {
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
          "api-key": "76AF4AE4C1993685E45276275282D949",
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
    console.log("before", suggestions);
    setSuggestions(docNames);
    console.log("after", suggestions);
  };
  // if (term) {
  //   searchAZ(term);
  // }
  //}, [term]);

  return (
    <div className="container">
      <>
        <label>Search Term</label>
        <br />
        <input
          id="SearchInput"
          type="text"
          className="col-md-10 input"
          onChange={(e) => updateQueryTerm(e.target.value)}
          // value = {term}
        />
        {suggestions &&
          suggestions.map((documentname: string, index: number) => (
            <div
              key={index}
              className="suggestion col-md-12 justify-content-md-center"
              onClick={() => onSuggestHandler(documentname)}
            >
              {documentname}
            </div>
          ))}
      </>
    </div>
  );
};

export default Search;
