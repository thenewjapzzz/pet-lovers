import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  createRow,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "../../components/Menu/Menu";
import './Pets.css';
import PetsIcon from "@mui/icons-material/Pets";

// Dados fictícios para pets
const fakeDataPets = [
  {
    id: "1",
    nome: "Rex",
    tipo: "Cachorro",
    raca: "Labrador",
    genero: "Masculino",
  },
  {
    id: "2",
    nome: "Miau",
    tipo: "Gato",
    raca: "Persa",
    genero: "Feminino",
  },
  {
    id: "3",
    nome: "Fido",
    tipo: "Cachorro",
    raca: "Bulldog",
    genero: "Masculino",
  },
  {
    id: "4",
    nome: "Nina",
    tipo: "Gato",
    raca: "Siamês",
    genero: "Feminino",
  },
  {
    id: "5",
    nome: "Bingo",
    tipo: "Cachorro",
    raca: "Beagle",
    genero: "Masculino",
  },
  {
    id: "6",
    nome: "Lola",
    tipo: "Gato",
    raca: "Maine Coon",
    genero: "Feminino",
  },
  {
    id: "7",
    nome: "Thor",
    tipo: "Cachorro",
    raca: "Pastor Alemão",
    genero: "Masculino",
  },
  {
    id: "8",
    nome: "Bella",
    tipo: "Gato",
    raca: "Bengal",
    genero: "Feminino",
  },
  {
    id: "9",
    nome: "Spike",
    tipo: "Cachorro",
    raca: "Pit Bull",
    genero: "Masculino",
  },
  {
    id: "10",
    nome: "Sophie",
    tipo: "Gato",
    raca: "Ragdoll",
    genero: "Feminino",
  },
];

const PetManagement = () => {
  const [creatingRowIndexPet, setCreatingRowIndexPet] = useState<number | undefined>();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  // Colunas para a tabela de pets
  const columnsPets = useMemo<MRT_ColumnDef[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "nome",
      header: "Nome",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.nome,
        helperText: validationErrors.nome,
        onFocus: () => setValidationErrors({ ...validationErrors, nome: undefined }),
      },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.tipo,
        helperText: validationErrors.tipo,
        onFocus: () => setValidationErrors({ ...validationErrors, tipo: undefined }),
      },
    },
    {
      accessorKey: "raca",
      header: "Raça",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.raca,
        helperText: validationErrors.raca,
        onFocus: () => setValidationErrors({ ...validationErrors, raca: undefined }),
      },
    },
    {
      accessorKey: "genero",
      header: "Gênero",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.genero,
        helperText: validationErrors.genero,
        onFocus: () => setValidationErrors({ ...validationErrors, genero: undefined }),
      },
    },
  ], [validationErrors]);

  // Tabela de pets
  const tablePets = useMaterialReactTable({
    columns: columnsPets,
    data: fakeDataPets,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    positionCreatingRow: creatingRowIndexPet,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar">
          <IconButton
            color="error"
            onClick={() => {
              if (window.confirm("Tem certeza que deseja deletar esse pet?")) {
                console.log(`Deleted pet with ID: ${row.original.id}`);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="btn-register-pet"
        startIcon={<PetsIcon />} // Troque PersonAddAltIcon por PetsIcon
        variant="contained"
        onClick={() => {
          setCreatingRowIndexPet(table.getRowModel().rows.length);
          table.setCreatingRow(true);
        }}
      >
        Cadastrar Pet
      </Button>
    ),
  });

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <div className="container-total">
        <div className="example-container">
          <div className="table-wrapper">
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "30px", color: '#333' }}
            >
              Gerenciamento de Pets
            </Typography>
            <MaterialReactTable table={tablePets} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PetManagement;
