import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridApi, GridColDef } from '@mui/x-data-grid';
import React from 'react'; //, useState
import IRelationships from '../interfaces/IRelationships';
import { DeleteRelations } from '../RelationshipControllerApi';
type Props = {
  relationships: IRelationships[];
  reloadRelationships: () => void;
};

const RelationshipGrid: React.FC<Props> = ({ relationships, reloadRelationships }) => {
  const columns: GridColDef[] = [
    { field: '__check__', hide: true },
    {
      field: 'action',
      headerName: '',
      renderCell: (params) => {
        const onClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
          const thisRow: any = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(params.id, f);
          });
          // console.log(thisRow.leftNodeId);
          (async () => {
            const t = await DeleteRelations(thisRow.leftNodeId, thisRow.rightNodeId, thisRow.relationshipNameId);
            if (t.status === 200) {
              reloadRelationships();
            }
          })();
          //return alert(JSON.stringify(thisRow));
        };

        return (
          <IconButton aria-label='delete' onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        );
      },
      sortable: false,
      width: 20,
    },
    { field: 'id', headerName: 'id', hide: true, width: 90 },
    {
      editable: true,
      field: 'leftNodeName',
      headerName: 'Left page',
      width: 200,
    },

    {
      editable: true,
      field: 'leftPageType',
      headerName: 'Left page type',
      width: 200,
    },
    {
      description: 'Display all related pages.',
      field: 'relationshipName',
      headerName: 'Relationship name',
      sortable: true,
      width: 200,
    },
    {
      editable: true,
      field: 'rightNodeName',
      headerName: 'Right page',
      width: 200,
    },
    {
      editable: true,
      field: 'rightPageType',
      headerName: 'Right page type',
      width: 200,
    },
    {
      field: 'leftNodeId',
      headerName: 'leftNodeId',
      hide: true,
    },
    {
      field: 'rightNodeId',
      headerName: 'rightNodeId',
      hide: true,
    },
    {
      field: 'relationshipNameId',
      headerName: 'relationshipNameId',
      hide: true,
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        columns={columns}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowHeight={() => 'auto'}
        checkboxSelection
        pageSize={10}
        rows={relationships}
        rowsPerPageOptions={[5, 10, 15, 100]}
      />
    </Box>
  );
};
export default RelationshipGrid;
