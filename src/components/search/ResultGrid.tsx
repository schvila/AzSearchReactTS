import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack } from '@mui/system';
import { DataGrid, GridColDef, GridFooter, GridFooterContainer } from '@mui/x-data-grid';
import * as React from 'react';
import relConfiguration from '../../Config';
import IAZDocument from '../../interfaces/IAZDocument';
import { AddRelations } from '../../RelationshipControllerApi';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', hide: true, width: 90 },
  {
    editable: true,
    field: 'documentname',
    headerName: 'Name',
    width: 200,
  },
  {
    editable: true,
    field: 'title',
    headerName: 'Title',
    width: 200,
  },
  {
    editable: true,
    field: 'type',
    headerName: 'Type',
    width: 110,
  },
  {
    description: 'Display all related pages.',
    field: 'relationships',
    headerName: 'Direct relations',
    sortable: true,
    width: 350,
  },
];
type Props = {
  reloadRelationships: () => void;
  results: IAZDocument[];
};
const menuItems = relConfiguration().relationshipNames;
const ResultGrid: React.FC<Props> = ({ results, reloadRelationships }) => {
  results.map((item) => {
    item.id = item.sys_id;
  });

  const [relType, setRelType] = React.useState('');
  const [rowsData, setRowsData] = React.useState<any[]>([]);

  const handleAddSelected = () => {
    let rightNodes = '';
    rowsData.forEach((item) => {
      rightNodes += item.nodeid + ',';
    });
    (async () => {
      const t = await AddRelations(relType, rightNodes);
      if (t.status === 200) {
        reloadRelationships();
      }
    })();
  };

  function checkDisabledButton() {
    if (relType == '' || rowsData.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  const addIsDisabled = checkDisabledButton();

  const selectionChanged = (items: any[]) => {
    const rd = items.map((id) => results.find((row) => row.id === id));
    setRowsData(rd);
  };
  const relationTypeChanged = (event: SelectChangeEvent) => {
    setRelType(event.target.value);
  };
  function CustomFooter() {
    return (
      <GridFooterContainer>
        <Stack alignItems='flex-end' direction='row' spacing={2}>
          <InputLabel id='rel-type-label'>Relation name</InputLabel>
          <Select
            label='Relationship name'
            labelId='rel-type-label'
            onChange={relationTypeChanged}
            sx={{ height: '2em', width: 150 }}
            value={relType}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {menuItems.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <Button disabled={addIsDisabled} onClick={handleAddSelected} sx={{ height: '2em' }} variant='contained'>
            Add Selected
          </Button>
        </Stack>
        <GridFooter
          sx={{
            border: 'none', // To delete double border.
          }}
        />
      </GridFooterContainer>
    );
  }
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        columns={columns}
        components={{ Footer: CustomFooter }}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowHeight={() => 'auto'}
        checkboxSelection
        onSelectionModelChange={selectionChanged}
        pageSize={10}
        rows={results}
        rowsPerPageOptions={[5, 10, 15, 100]}
      />
    </Box>
  );
};
export default ResultGrid;
