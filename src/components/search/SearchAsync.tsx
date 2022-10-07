import { Autocomplete, Grid, TextField } from '@mui/material';
import { throttle } from 'lodash';
import React, { useState } from 'react';
import myConfig from '../../Config';
import IAZDocument from '../../interfaces/IAZDocument';

type Props = {
  setResults: (results: IAZDocument[]) => void;
};

const SearchAsync: React.FC<Props> = (props: Props) => {
  const [suggestions, SetSuggestions] = useState<IAZDocument[]>([]);
  const [searchVal, SetSearchVal] = useState<string>('');

  const searchAZ = async (value: string, top = 10) => {
    const bodyBase = {
      count: true,
      queryType: 'full',
      search: `${value}`,
      searchFields: 'documentname,title,relationships',
      select: 'documentname,title,relationships, sys_id,nodeguid,sys_site,documentid,nodeid',
    };
    let body;
    if (top > 0) {
      body = { top: top, ...bodyBase };
    } else {
      body = bodyBase;
    }
    const config = myConfig();
    const qbody = JSON.stringify(body);
    const response = await fetch(
      `${config.searchUrl}/indexes/${config.indexName}/docs/search?api-version=2021-04-30-Preview`,
      {
        body: qbody,
        headers: {
          'api-key': config.apikey,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    const finalData = await response.json();

    if (top === 0) {
      props.setResults(finalData.value);
    } else {
      SetSuggestions(finalData.value);
    }
  };

  const handleOnKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      props.setResults([]);
      SetSuggestions([]);
      throtleAlias(searchVal, 0);
    }
  };
  const throtleAlias = throttle(searchAZ, 500);
  return (
    <Autocomplete
      autoComplete
      clearOnBlur={false}
      clearOnEscape={false}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.documentname}
      includeInputInList={false}
      isOptionEqualToValue={(option, value) => option.sys_id === value.sys_id}
      onChange={(event, newValue) => {
        const val = newValue?.documentname;
        if( val !== undefined && val !== ''){
          props.setResults([]);
          SetSuggestions([]);
          throtleAlias(val, 0);
            }
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') {
          SetSearchVal(newInputValue);
          throtleAlias(newInputValue);
        } else {
          SetSuggestions([]);
        }
      }}
      options={suggestions}
      renderInput={(params) => <TextField {...params} label='Search' onKeyDown={handleOnKeyDown} variant='outlined' />}
      renderOption={(props, option: any) => {
        // key option.sys_id
        return (
          <li {...props} key={option.sys_id}>
            <Grid alignItems='center' container>
              <Grid item xs>
                {option.documentname}
              </Grid>
            </Grid>
          </li>
        );
      }}
      sx={{ display: 'flex', width: 300 }}
    />
  );
};

export default SearchAsync; // as React.ComponentType<BaseProps>;
