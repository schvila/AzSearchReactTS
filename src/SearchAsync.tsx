import React from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { throttle } from "lodash";

type BaseProps = {};

type InjectedProps = {};

type Props = BaseProps & InjectedProps;

// function debounce(func: any, timeout = 1000) {
//   let timer: NodeJS.Timer | undefined = undefined;
//   return (text: string) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(text);
//     }, timeout);
//   };
// }
const SearchAsync: React.FC<Props> = () => {
  const [value, setValue] = React.useState<any>(undefined);
  const [results, setRsults] = React.useState<any[]>([]);

  const fetchOptions = async (inputValue: any) => {
    console.log(`searching for -${inputValue}-`);

    let qbody = JSON.stringify({
      queryType: "full",
      count: true,
      top: 10,
      search: `${inputValue}`,
      searchFields: "documentname,title"
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
    console.log(finalData.value);
    setRsults(finalData.value);
  };

  const throtleAlias = throttle(fetchOptions, 2000);
  //loading={true}
  
  return (
    <Autocomplete
      sx={{ display: "flex", width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="outlined" />
      )}
      //options={!results || results.length === 0 ? [{label:"Loading...", id:0}] : results }
      options={results}
      onInputChange={(event, newInputValue) => {
        console.log(`new input: ${newInputValue}`);
        if (newInputValue !== "") {
          throtleAlias(newInputValue);
        } else {
          setRsults([]);
        }
        //setInputValue(newInputValue);
      }}
      onChange={(event, newValue, reason) => {
        console.log(`onChange val ${newValue} reason ${reason}`);

        setValue(newValue);
      }}
      value={value?.documentname}
      filterOptions={(x) => x}
      autoComplete
      includeInputInList={false}
      filterSelectedOptions
      renderOption={(props, option: any) => {
        console.log(option);
        console.log(props);
        console.log(option.sys_id);
        
        // key option.sys_id
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item xs>
                <span
                    key={option.sys_id}
                  >
                    {option.documentname}
                  </span>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default SearchAsync as React.ComponentType<BaseProps>;
