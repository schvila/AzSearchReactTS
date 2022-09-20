import React, { useState } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { throttle } from "lodash";
import IAZDocument from "../../interfaces/IAZDocument";
import myConfig from "../../Config";

type Props = {
  setResults: (results: IAZDocument[]) => void;
};

const SearchAsync: React.FC<Props> = (props: Props) => {
  const [suggestions, SetSuggestions] = useState<IAZDocument[]>([]);
  const [searchVal, SetSearchVal] = useState<string>("");

  const searchAZ = async (value: string, top = 10) => {
    const bodyBase = {
      queryType: "full",
      count: true,
      search: `${value}`,
      searchFields: "documentname,title,relationships",
      select: "documentname,title,relationships, sys_id,nodeguid,sys_site,documentid,nodeid",
    };
    let body;
    if (top > 0) {
      body = { top: top, ...bodyBase };
    }
    else {
      body = bodyBase;
    }
    const config = myConfig();
    let qbody = JSON.stringify(body);
    let response = await fetch(
      `${config.serviceName}/indexes/${config.indexName}/docs/search?api-version=2021-04-30-Preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": config.apikey,
        },
        body: qbody,
      }
    );

    let finalData = await response.json();
    
    if (top === 0) {
      props.setResults(finalData.value);
    } else {
      SetSuggestions(finalData.value);
    }
  };

  const handleOnKeyDown = (event: any) => {
    if (event.key === "Enter") {
      props.setResults([]);
      SetSuggestions([]);
      throtleAlias(searchVal, 0);
    }
  };
  const throtleAlias = throttle(searchAZ, 500);
  return (
    <Autocomplete
      sx={{ display: "flex", width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          onKeyDown={handleOnKeyDown}
        />
      )}
      options={suggestions}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== "") {
          SetSearchVal(newInputValue);
          throtleAlias(newInputValue);
        } else {
          SetSuggestions([]);
        }
      }}
      onChange={(event, newValue, reason) => {
      }}
      isOptionEqualToValue={(option, value) => option.sys_id === value.sys_id}
      getOptionLabel={(option) => option.documentname}
      filterOptions={(x) => x}
      autoComplete
      clearOnBlur={false}
      clearOnEscape={false}
      includeInputInList={false}
      renderOption={(props, option: any) => {

        // key option.sys_id
        return (
          <li {...props} key={option.sys_id}>
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

export default SearchAsync; // as React.ComponentType<BaseProps>;
