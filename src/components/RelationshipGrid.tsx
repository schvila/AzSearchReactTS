import React, {useEffect} from "react"; //, useState
import Box from "@mui/material/Box";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridFooter, GridFooterContainer, GridRenderCellParams } from "@mui/x-data-grid";
import IRelationships from "../interfaces/IRelationships";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const columns: GridColDef[] = [
  {field: "__check__", hide: true},
  {
    field: "action",
    headerName: "",
    width: 20,
    sortable: false,
    renderCell: (params) => {
      const onClick = () => {
        const api: GridApi = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow: any = {};
    
        fields.forEach((f) => {
          thisRow[f] = params.getValue(params.id, f);
        });
    
        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>;
    }
  },
  { field: "id", headerName: "id", width: 90, hide: true },
    {
      field: "leftNodeName",
      headerName: "Left page",
      editable: true,
    },

    {
      field: "leftPageType",
      headerName: "Left page type",
      editable: true,
    },
    {
      field: "relationshipName",
      headerName: "Relationship name",
      description: "Display all related pages.",
      sortable: true,
    },
    {
        field: "rightNodeName",
        headerName: "Right page",
        editable: true,
      },
      {
        field: "rightPageType",
        headerName: "Right page type",
        editable: true,
      },
    ];
    type Props = {
      reload: boolean
    };
    
const RelationshipGrid: React.FC<Props>  = ({reload}) => {

  //const [relationships, setRelationships] = useState<IRelationships[]>([]);    
  useEffect(() => {
      let mounted = true;
      // (async () => {
      //   const res = await fetch('example.com');
      //   if (mounted) {
      //     // only try to update if we are subscribed (or mounted)
      //     setRelationships(res);
      //   }
      // })();
        if (mounted) {
          // only try to update if we are subscribed (or mounted)
          console.count('Relationship grid reload called');
        }
      return () =>{ mounted = false; }// cleanup function    
      },[reload]);
      // {      isMounted.current = false;    };  }, []);  
  const relationships = [
    {
        "id": "7d5e9b8a-97b1-48bf-b965-819a5c86f65a",
        "leftNodeId": 121,
        "leftNodeName": "Incubator shakers overview",
        "relationshipName": "RelatesTo",
        "relationshipNameId": 3,
        "rightNodeId": 119,
        "rightNodeName": "Multitron 4 CH info",
        "leftClassId": 0,
        "rightClassId": 0,
        "leftPageType": null,
        "rightPageType": null
    },
    {
        "id": "1464c0f7-2270-4952-9dc4-560ef438027f",
        "leftNodeId": 121,
        "leftNodeName": "Incubator shakers overview",
        "relationshipName": "DependsOn",
        "relationshipNameId": 4,
        "rightNodeId": 106,
        "rightNodeName": "relationships test",
        "leftClassId": 0,
        "rightClassId": 0,
        "leftPageType": null,
        "rightPageType": null
    }
  ];       
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={relationships}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15,100]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        pageSize={5}
        autoHeight={true}
        
      />
    </Box>
  );        
};
export default RelationshipGrid;