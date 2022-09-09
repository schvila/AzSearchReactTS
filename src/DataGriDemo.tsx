import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import IAZDocument from "./IAZDocument";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];
// https://www.anycodings.com/1questions/205506/material-ui-get-all-rows-from-datagrid
function useApiRef() {
  const apiRef = React.useRef(null);
  const _columns = React.useMemo(
    () =>
      columns.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          apiRef.current = params.api;
          return null;
        },
      }),
    [columns]
  );

  return { apiRef, columns: _columns };
}
const rows = [
  { id: 'A', lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 'B', lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 'C', lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 'D', lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 'E', lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 'F', lastName: "Melisandre", firstName: null, age: 150 },
  { id: 'G', lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 'H', lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 'I', lastName: "Roxie", firstName: "Harvey", age: 65 },
];

type Props = {
  results: IAZDocument[]
};

const DataGridDemo: React.FC<Props> = ({results}) => {
  console.log({resultpar: results});
  
  // see https://stackoverflow.com/questions/66424752/get-row-item-on-checkbox-selection-in-react-mui-datagrid
  const { apiRef, columns } = useApiRef();
  //const [results, setResults] = useState<any[]>([]);
  const handleClickButton = () => {
    // @ts-ignore: Object is possibly 'null'.
    //console.log(apiRef?.current.getRowModels());
    console.log(results);
  };
  const selectionChanged = (items: any[]) => {
    
    console.log(items);
    const rowsData = items.map((id) => rows.find((row)=> row.id === id));
    console.log(rowsData);
    
    //setResults(rowsData)
  };
return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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
export default DataGridDemo;
