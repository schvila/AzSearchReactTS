import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IAZDocument from "./IAZDocument";

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 90, hide: true },
  {
    field: "documentname",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 110,
    editable: true,
  },
  {
    field: "relationships",
    headerName: "Direct relations",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

// const rows = [
//   { id: 'A', lastName: "Snow", firstName: "Jon", age: 35, sys_id: "256" },
//   { id: 'B', lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 'C', lastName: "Lannister", firstName: "Jaime", age: 45, sys_id: "256" },
//   { id: 'D', lastName: "Stark", firstName: "Arya", age: 16, sys_id: "256" },
//   { id: 'E', lastName: "Targaryen", firstName: "Daenerys", age: null, sys_id: "256" },
//   { id: 'F', lastName: "Melisandre", firstName: null, age: 150, sys_id: "256" },
//   { id: 'G', lastName: "Clifford", firstName: "Ferrara", age: 44, sys_id: "256" },
//   { id: 'H', lastName: "Frances", firstName: "Rossini", age: 36, sys_id: "256" },
//   { id: 'I', lastName: "Roxie", firstName: "Harvey", age: 65, sys_id: "256" },
// ];

type Props = {
  results: IAZDocument[]
};

const ResultGrid: React.FC<Props> = ({results}) => {
  results.map(item=>{
    item.id = item.sys_id});
  console.log({resultpar: results});
  
  let rowsData: any[];
  const handleClickButton = () => {
    console.log(rowsData);
  };

  const selectionChanged = (items: any[]) => {
    
    console.log(items);
    rowsData = items.map((id) => results.find((row)=> row.id === id));
    console.log(rowsData);
    
    //setResults(rowsData)
  };
return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={results}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15,100]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={selectionChanged}
      />
      <Button onClick={handleClickButton}>Show data</Button>
    </Box>
  );
}
export default ResultGrid;
