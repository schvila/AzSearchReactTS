import { Autocomplete, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { throttle } from 'lodash';
import React, { useState } from 'react';
import IAZDocument from '../../interfaces/IAZDocument';

type Props = {
  setResults: (results: IAZDocument[]) => void;
};

const SearchAsync: React.FC<Props> = (props: Props) => {
  const [suggestions, SetSuggestions] = useState<IAZDocument[]>([]);
  const [searchVal, SetSearchVal] = useState<string>('');
  const addSearchVal = (azDocs: IAZDocument[], val: string) =>  {
    if(azDocs !== null && azDocs.length > 0) {
      const arr = [{documentname:val, sys_id:val},...azDocs];
      console.log(arr);
      console.log({azDocsLen: azDocs.length}, val);
    }
  }
  

  const searchAZ = async (value: string, top = 10) => {
    ///////////////////////////////Direct AZ version
    // const bodyBase = {
    //   count: true,
    //   queryType: 'full',
    //   search: `${value}`,
    //   searchFields: 'documentname,title,relationships',
    //   select: 'documentname,title,relationships, sys_id,nodeguid,sys_site,documentid,nodeid',
    // };
    // let body;
    // if (top > 0) {
    //   body = { top: top, ...bodyBase };
    // } else {
    //   body = bodyBase;
    // }
    // const config = myConfig();
    // const qbody = JSON.stringify(body);
    // const response = await fetch(
    //   `${config.searchUrl}/indexes/${config.indexName}/docs/search?api-version=2021-04-30-Preview`,
    //   {
    //     body: qbody,
    //     headers: {
    //       'api-key': config.apikey,
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //   },
    // );
    /////////////////////////// MVC AzSearch https://localhost:44381  axios.get(`${window.location.origin}/AzureSearch?${value}`);
    const response = await axios.get(`/AzureSearch?searchTerm=${value}`); //http://localhost:58585

    //const finalData = await response.json();

    if (top === 0) {
      props.setResults(response.data.value);
    } else {
      addSearchVal(response.data.value, value)
      SetSuggestions(response.data.value);
    }
  };

  const handleOnKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      resultSearch(searchVal);
    }
  };
  const resultSearch = (text: string) => {
    props.setResults([]);
    SetSuggestions([]);
    throtleAlias(text, 0);
  }
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
      noOptionsText={''}
      onChange={(event, newValue) => {
        const val = newValue?.documentname;
        if( val !== undefined && val !== ''){
          resultSearch(val);
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
