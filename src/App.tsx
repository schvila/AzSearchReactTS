//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import Search from './Search';
import SearchAsync from './SearchAsync';
import { Grid } from '@material-ui/core';
function App() {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      style={{minHeight: '100vh'}}
      spacing={5}
    >
        <Grid item>
          <SearchAsync />
          <p>Any text will do.</p>
        </Grid>
        <Grid item>
          <Search />
        </Grid>
   </Grid>
  );
}

export default App;
