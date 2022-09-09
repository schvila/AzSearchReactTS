import React, {useState} from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { throttle } from "lodash";
import IAZDocument from "./IAZDocument";

type BaseProps = {};

type InjectedProps = {};

type Props = BaseProps & InjectedProps;


const SearchAsync: React.FC<Props> = () => {
  const [suggestions, SetSuggestions] = useState<IAZDocument[]>([]);
  const [fullSearch, setFullSearch] = useState<boolean>(false);
  const [results, SetResults] = useState<IAZDocument[]>([]);

  const fetchOptions = async (inputValue: any) => {
    console.log(`searching for -${inputValue}-`);
    let qbody = JSON.stringify({
      queryType: "full",
      count: true,
      top: 10,
      search: `${inputValue}`,
      searchFields: "documentname,title,relationships",
      select: "documentname,title,relationships, sys_id,nodeguid,sys_site"
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
    SetSuggestions(finalData.value);
  };

const handleOnKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log('full/result search now;');
      setFullSearch(true);
    }
  };
  const throtleAlias = throttle(fetchOptions, 500);
  return (
    <Autocomplete
    sx={{ display: "flex", width: 300 }}
      renderInput={(params) => (
        <TextField {...params} 
          label="Search" 
          variant="outlined" 
          onKeyDown={handleOnKeyDown}
        />
      )}
      options={suggestions}
      onInputChange={(event, newInputValue) => {
        console.log(`new input: ${newInputValue}`);
        setFullSearch(false);
        if (newInputValue !== "") {
          throtleAlias(newInputValue);
        } else {
          SetSuggestions([]);
        }
      }}
      onChange={(event, newValue, reason) => {
        console.log(`onChange val ${newValue} reason ${reason}`);
      }}
      isOptionEqualToValue={(option, value) => option.sys_id === value.sys_id}
      getOptionLabel={(option)=>option.documentname}
      filterOptions={(x) => x}
      autoComplete
      clearOnBlur={ false }
      clearOnEscape={ false }
      includeInputInList={false}
      renderOption={(props, option: any) => {
        console.log(option);
        console.log(props);
        console.log(option.sys_id);
        
        // key option.sys_id
        return (
          <li {...props}
                    key={option.sys_id}
                    >
            <Grid container alignItems="center">
              <Grid item xs>
                    {option.documentname}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default SearchAsync as React.ComponentType<BaseProps>;
