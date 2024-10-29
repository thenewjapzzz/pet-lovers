import React, { Component } from "react";
import {
  MaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import PetAddIcon from "@mui/icons-material/Pets";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Pets.css";

// Dados fictícios para pets
const initialPetData = [
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

class PetManagement extends Component {
  state = {
    data: initialPetData,
    creatingRowIndex: undefined,
    validationErrors: {},
  };

  theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  columns = [
    {
      accessorKey: "nome",
      header: "Nome do Pet",
      muiEditTextFieldProps: {
        required: true,
        error: !!this.state.validationErrors.nome,
        helperText: this.state.validationErrors.nome,
        onFocus: () =>
          this.setState({ validationErrors: { ...this.state.validationErrors, nome: undefined } }),
      },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      muiEditTextFieldProps: {
        required: true,
        error: !!this.state.validationErrors.tipo,
        helperText: this.state.validationErrors.tipo,
        onFocus: () =>
          this.setState({ validationErrors: { ...this.state.validationErrors, tipo: undefined } }),
      },
    },
    {
      accessorKey: "genero",
      header: "Gênero",
      muiEditTextFieldProps: {
        required: true,
        error: !!this.state.validationErrors.genero,
        helperText: this.state.validationErrors.genero,
        onFocus: () =>
          this.setState({ validationErrors: { ...this.state.validationErrors, genero: undefined } }),
      },
    },
    {
      accessorKey: "raca",
      header: "Raça",
      muiEditTextFieldProps: {
        required: true,
        error: !!this.state.validationErrors.raca,
        helperText: this.state.validationErrors.raca,
        onFocus: () =>
          this.setState({ validationErrors: { ...this.state.validationErrors, raca: undefined } }),
      },
    },
  ];

  renderRowActions = ({ row, table }) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Editar">
        <IconButton onClick={() => {
          const updatedData = this.state.data.map(item => 
            item.id === row.original.id ? {...row.original, editing: true} : item
          );
          this.setState({ data: updatedData });
        }}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar">
        <IconButton
          color="error"
          onClick={() => {
            if (window.confirm("Tem certeza que deseja deletar este pet?")) {
              this.setState(prevState => ({
                data: prevState.data.filter(item => item.id !== row.original.id),
              }));
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  renderTopToolbarCustomActions = () => (
    <Button
      className="btn-register-pet"
      startIcon={<PetAddIcon />}
      variant="contained"
      onClick={() => {
        this.setState({ creatingRowIndex: this.state.data.length });
      }}
    >
      Cadastrar Pet
    </Button>
  );

  render() {
    return (
      <ThemeProvider theme={this.theme}>
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
              <MaterialReactTable
                columns={this.columns}
                data={this.state.data}
                renderRowActions={this.renderRowActions}
                renderTopToolbarCustomActions={this.renderTopToolbarCustomActions}
                enableEditing
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default PetManagement;
