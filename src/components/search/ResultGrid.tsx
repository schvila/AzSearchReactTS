import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IAZDocument from "../../interfaces/IAZDocument";
import { Stack } from "@mui/system";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
    description: "Display all related pages.",
    sortable: true,
    width: 300,
  },
];
type Props = {
  results: IAZDocument[]
};

const ResultGrid: React.FC<Props> = ({results}) => {
  results.map(item=>{
  item.id = item.sys_id});
  console.log({resultpar: results});
  const [relType, setRelType] = React.useState('');

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
  const relationTypeChanged = (event: SelectChangeEvent) => {
    setRelType(event.target.value);

  }
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
      <Stack 
        spacing={2} 
        direction="row" 
        alignItems="flex-end"
      >
      <InputLabel id="rel-type-label">Relation name</InputLabel>
      <Select
        labelId="rel-type-label"
        sx={{width:150}}
        label='Relationship name'
        onChange={relationTypeChanged}
        value={relType}
      >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="RelatesTo">RelatesTo</MenuItem>
          <MenuItem value="DependsOn">DependsOn</MenuItem>
          <MenuItem value="ContinuedBy">ContinuedBy</MenuItem>
          <MenuItem value="ReplacedBy">ReplacedBy</MenuItem>
          <MenuItem value="SuperseededBy">SuperseededBy</MenuItem>
      </Select>
      <Button variant="outlined" onClick={handleClickButton}>Show data</Button>
      </Stack>
    </Box>
  );
}
export default ResultGrid;
