import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IAZDocument from "../../interfaces/IAZDocument";
import { Stack } from "@mui/system";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { AddRelations } from "../../RelationshipControllerApi";
import type {} from '@mui/x-data-grid/themeAugmentation';

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
  reloadRelationships: () => void;
};

const ResultGrid: React.FC<Props> = ({results, reloadRelationships}) => {
  results.map(item=>{
  item.id = item.sys_id});

  const [relType, setRelType] = React.useState('');
  const [rowsData, setRowsData] = React.useState<any[]>([]);
  
  const handleAddSelected = () => {
    let rightNodes = '';
    rowsData.forEach((item)=>
    {
      rightNodes += item.nodeid + ','
    });
    (async () => {
      var t = await AddRelations(relType, rightNodes);
      if(t.status === 200) {
        reloadRelationships()
      }
    })();
  };

  function checkDisabledButton(){
    if(relType == "" || rowsData.length == 0) {
      return true;
    }
    else {
      return false;
    }
  };
  let addIsDisabled = checkDisabledButton();

  const selectionChanged = (items: any[]) => {
    
    let rd  = items.map((id) => results.find((row)=> row.id === id));
    setRowsData(rd);
   };
  const relationTypeChanged = (event: SelectChangeEvent) => {
    setRelType(event.target.value);
  }
  function CustomFooter () {
    return (
      <GridFooterContainer>
      <Stack 
        spacing={2} 
        direction="row" 
        alignItems="flex-end"
      >
        <InputLabel id="rel-type-label">Relation name</InputLabel>
        <Select
          labelId="rel-type-label"
          sx={{width:150, height:'2em'}}
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
        <Button
          sx={{height:'2em'}} 
          variant="contained"
          disabled={addIsDisabled}
          onClick={handleAddSelected}>Add Selected</Button>
      </Stack>
      <GridFooter sx={{
        border: 'none', // To delete double border.
        }} />
      </GridFooterContainer>
    );
  }  
return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={results}
        getRowHeight={()=> 'auto'}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15,100]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={selectionChanged}
        components={{Footer: CustomFooter}}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        pageSize={5}
        autoHeight={true}      />
    </Box>
  );
}
export default ResultGrid;
