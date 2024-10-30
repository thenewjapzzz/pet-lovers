import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import PetAddIcon from "@mui/icons-material/Pets";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Pets.css";

// Dados fictícios para pets
const initialPetData = [
  { id: "1", nome: "Rex", tipo: "Cachorro", raca: "Labrador", genero: "Masculino" },
  { id: "2", nome: "Miau", tipo: "Gato", raca: "Persa", genero: "Feminino" },
  { id: "3", nome: "Fido", tipo: "Cachorro", raca: "Bulldog", genero: "Masculino" },
  { id: "4", nome: "Nina", tipo: "Gato", raca: "Siamês", genero: "Feminino" },
  { id: "5", nome: "Bingo", tipo: "Cachorro", raca: "Beagle", genero: "Masculino" },
  { id: "6", nome: "Lola", tipo: "Gato", raca: "Maine Coon", genero: "Feminino" },
  { id: "7", nome: "Thor", tipo: "Cachorro", raca: "Pastor Alemão", genero: "Masculino" },
  { id: "8", nome: "Bella", tipo: "Gato", raca: "Bengal", genero: "Feminino" },
  { id: "9", nome: "Spike", tipo: "Cachorro", raca: "Pit Bull", genero: "Masculino" },
  { id: "10", nome: "Sophie", tipo: "Gato", raca: "Ragdoll", genero: "Feminino" },
];

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const PetManagement = () => {
  const [data, setData] = useState(initialPetData);
  const [creatingRowIndex, setCreatingRowIndex] = useState(undefined);
  const [validationErrors, setValidationErrors] = useState({});

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome do Pet",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.nome,
        helperText: validationErrors.nome,
        onFocus: () => setValidationErrors((prevErrors) => ({ ...prevErrors, nome: undefined })),
      },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.tipo,
        helperText: validationErrors.tipo,
        onFocus: () => setValidationErrors((prevErrors) => ({ ...prevErrors, tipo: undefined })),
      },
    },
    {
      accessorKey: "genero",
      header: "Gênero",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.genero,
        helperText: validationErrors.genero,
        onFocus: () => setValidationErrors((prevErrors) => ({ ...prevErrors, genero: undefined })),
      },
    },
    {
      accessorKey: "raca",
      header: "Raça",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.raca,
        helperText: validationErrors.raca,
        onFocus: () => setValidationErrors((prevErrors) => ({ ...prevErrors, raca: undefined })),
      },
    },
  ];

  const handleEditClick = (row) => {
    const updatedData = data.map((item) =>
      item.id === row.original.id ? { ...row.original, editing: true } : item
    );
    setData(updatedData);
  };

  const handleDeleteClick = (row) => {
    if (window.confirm("Tem certeza que deseja deletar este pet?")) {
      setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
    }
  };

  const renderRowActions = ({ row }) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleEditClick(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar">
        <IconButton color="error" onClick={() => handleDeleteClick(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderTopToolbarCustomActions = () => (
    <Button
      className="btn-register-pet"
      startIcon={<PetAddIcon />}
      variant="contained"
      onClick={() => setCreatingRowIndex(data.length)}
    >
      Cadastrar Pet
    </Button>
  );

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
              sx={{ fontWeight: "bold", fontSize: "30px", color: "#333" }}
            >
              Gerenciamento de Pets
            </Typography>
            <MaterialReactTable
              columns={columns}
              data={data}
              renderRowActions={renderRowActions}
              renderTopToolbarCustomActions={renderTopToolbarCustomActions}
              enableEditing
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PetManagement;
