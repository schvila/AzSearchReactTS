import SearchAsync from './SearchAsync';
import DataGridDemo from './DataGriDemo';
import React from 'react';

function App() {
  const defMargin = 10;
  //const [qresults, setResults] = React.useState<any[]>([]);
  return (
    <div style={{marginLeft: defMargin, marginRight: defMargin, marginTop: defMargin}}
    >
        <div>
          <SearchAsync  />
        </div>
        <div>
        <DataGridDemo />
        </div>
   </div>
  );
}

export default App;
