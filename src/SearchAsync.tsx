import React from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";

type BaseProps = {};

type InjectedProps = {};

type Props = BaseProps & InjectedProps;

function debounce(func: any, timeout = 1000) {
  let timer: NodeJS.Timer | undefined = undefined;
  return (text: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(text);
    }, timeout);
  };
}

const SearchAsync: React.FC<Props> = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<any>(undefined);
  const [options, setOptions] = React.useState<any>([]);

  const fetchOptions = async (inputValue: any) => {
    let qbody = JSON.stringify({
      queryType: "full",
      count: true,
      top: 10,
      search: `/.*${inputValue}.*/`,
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
    let docNames = finalData.value.map((item: any) => {
      return item.documentname;
    });
    setOptions(docNames);
  }

  const debounceFetchOptions = debounce(fetchOptions);

  React.useEffect(() => {
    debounceFetchOptions(inputValue);
  }, [inputValue, value])

	return (
    <Autocomplete
    sx={{ display: 'flex', width:200 }}
      renderInput={
        (params) => <TextField {...params} label="Search" variant="outlined" />
      }
      options={options}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      value={ value }
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      renderOption={(props, option: any) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                { option }
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  );
}

export default SearchAsync as React.ComponentType<BaseProps>;
