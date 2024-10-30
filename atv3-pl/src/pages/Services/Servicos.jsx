import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Dados fictícios iniciais de produtos
const initialData = [
  {
    id: "1",
    nome: "Banho e Tosa",
    preco: "R$ 70,00",
    descricao: "Banho completo, corte higiênico, escovação de pelos",
    dataCadastro: "2024-01-01",
  },
  {
    id: "2",
    nome: "Tosa na Tesoura",
    preco: "R$ 90,00",
    descricao: "Tosa manual personalizada para raças de pelos longos",
    dataCadastro: "2024-01-02",
  },
  {
    id: "3",
    nome: "Hidratação de Pelos",
    preco: "R$ 50,00",
    descricao: "Tratamento de hidratação profunda para pelagem seca",
    dataCadastro: "2024-01-03",
  },
  {
    id: "4",
    nome: "Corte de Unhas",
    preco: "R$ 20,00",
    descricao: "Corte de unhas seguro para evitar desconforto",
    dataCadastro: "2024-01-04",
  },
  {
    id: "5",
    nome: "Hospedagem Pet (Diária)",
    preco: "R$ 100,00",
    descricao: "Alojamento e cuidado diário com supervisão",
    dataCadastro: "2024-01-05",
  },
  {
    id: "6",
    nome: "Consulta Veterinária",
    preco: "R$ 150,00",
    descricao: "Consulta de rotina com avaliação completa",
    dataCadastro: "2024-01-05",
  },
  {
    id: "7",
    nome: "Vacinação",
    preco: "R$ 80,00",
    descricao: "Aplicação de vacinas recomendadas para o pet",
    dataCadastro: "2024-01-05",
  },
  {
    id: "8",
    nome: "Castração",
    preco: "R$ 400,00",
    descricao: "Procedimento de esterilização seguro e supervisionado",
    dataCadastro: "2024-01-05",
  },
];

const Servico = () => {
  const [data, setData] = useState(initialData);
  const [creatingRowIndex, setCreatingRowIndex] = useState(undefined);
  const [validationErrors, setValidationErrors] = useState({});

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "nome",
      header: "Nome do Serviço",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.nome,
        helperText: validationErrors.nome,
        onFocus: () =>
          setValidationErrors((errors) => ({ ...errors, nome: undefined })),
      },
    },
    {
      accessorKey: "preco",
      header: "Preço",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.preco,
        helperText: validationErrors.preco,
        onFocus: () =>
          setValidationErrors((errors) => ({ ...errors, preco: undefined })),
      },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.descricao,
        helperText: validationErrors.descricao,
        onFocus: () =>
          setValidationErrors((errors) => ({
            ...errors,
            descricao: undefined,
          })),
      },
    },
    {
      accessorKey: "dataCadastro",
      header: "Data de Cadastro",
      enableEditing: false,
    },
  ];

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const handleSaveRow = (row) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === row.id ? row : item))
    );
    setValidationErrors({});
  };

  const handleAddRow = (row) => {
    setData((prevData) => [
      ...prevData,
      { ...row, id: String(prevData.length + 1) },
    ]);
    setCreatingRowIndex(undefined);
    setValidationErrors({});
  };

  const handleDeleteRow = (id) => {
    if (window.confirm("Tem certeza que deseja deletar esse produto?")) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

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
              Gerenciamento de Serviços
            </Typography>
            <MaterialReactTable
              columns={columns}
              data={data}
              createDisplayMode="row"
              editDisplayMode="row"
              enableEditing
              getRowId={(row) => row.id}
              renderRowActions={({ row }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleSaveRow(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button
                  className="btn-register-product"
                  startIcon={<AddShoppingCartIcon />}
                  variant="contained"
                  onClick={() => setCreatingRowIndex(data.length)}
                >
                  Cadastrar Serviço
                </Button>
              )}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Servico;
