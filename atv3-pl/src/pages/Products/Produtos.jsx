import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Produtos.css";

// Dados fictícios iniciais de produtos
const initialData = [
  {
    id: "1",
    nome: "Ração Premier Nutrição Clínica (3kg)",
    preco: "R$ 50,00",
    quantidade: 45,
    dataCadastro: "2024-01-01",
  },
  {
    id: "2",
    nome: "Ração Whiskas Sachê (85g)",
    preco: "R$ 20,00",
    quantidade: 50,
    dataCadastro: "2024-01-02",
  },
  {
    id: "3",
    nome: "Bola de borracha para cães",
    preco: "R$ 10,00",
    quantidade: 40,
    dataCadastro: "2024-01-03",
  },
  {
    id: "4",
    nome: "Varinha com penas para gatos",
    preco: "R$ 25,00",
    quantidade: 20,
    dataCadastro: "2024-01-04",
  },
  {
    id: "5",
    nome: "Cama ortopédica para cães de porte grande",
    preco: "R$ 220,00",
    quantidade: 10,
    dataCadastro: "2024-01-05",
  },
  {
    id: "6",
    nome: "Almofada para gatos",
    preco: "R$ 150,00",
    quantidade: 15,
    dataCadastro: "2024-01-05",
  },
  {
    id: "7",
    nome: "Coleira ajustável de nylon para cães",
    preco: "R$ 45,00",
    quantidade: 30,
    dataCadastro: "2024-01-05",
  },
  {
    id: "8",
    nome: "Guia retrátil para gatos",
    preco: "R$ 34,00",
    quantidade: 25,
    dataCadastro: "2024-01-05",
  },
  {
    id: "9",
    nome: "Vermífugo para cães",
    preco: "R$ 17,00",
    quantidade: 70,
    dataCadastro: "2024-01-05",
  },
  {
    id: "10",
    nome: "Caixa de transporte para cães e gatos",
    preco: "R$ 70,00",
    quantidade: 5,
    dataCadastro: "2024-01-05",
  },
];

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const Produtos = () => {
  const [data, setData] = useState(initialData);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "nome",
      header: "Nome do Produto",
      muiTableBodyCellEditTextFieldProps: {
        required: true,
      },
    },
    {
      accessorKey: "preco",
      header: "Preço",
      muiTableBodyCellEditTextFieldProps: {
        required: true,
      },
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade",
      muiTableBodyCellEditTextFieldProps: {
        required: true,
        type: "number",
      },
    },
    {
      accessorKey: "dataCadastro",
      header: "Data de Cadastro",
      enableEditing: false,
    },
  ];

  const handleEditRow = (row) => {
    const updatedData = data.map((item) =>
      item.id === row.original.id ? row.original : item
    );
    setData(updatedData);
  };

  const handleDeleteRow = (row) => {
    if (window.confirm("Tem certeza que deseja deletar esse produto?")) {
      const updatedData = data.filter((item) => item.id !== row.original.id);
      setData(updatedData);
    }
  };

  const handleAddRow = () => {
    const newProduct = {
      id: (data.length + 1).toString(),
      nome: "Novo Produto",
      preco: "R$ 0,00",
      quantidade: 0,
      dataCadastro: new Date().toISOString().split("T")[0],
    };
    setData([...data, newProduct]);
  };

  const renderRowActions = (row) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleEditRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Excluir">
        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderTopToolbarCustomActions = () => (
    <Button
      className="btn-register-product"
      startIcon={<AddShoppingCartIcon />}
      variant="contained"
      onClick={handleAddRow}
    >
      Cadastrar Produto
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
              Gerenciamento de Produtos
            </Typography>
            <MaterialReactTable
              columns={columns}
              data={data}
              enableEditing
              getRowId={(row) => row.id}
              renderRowActions={renderRowActions}
              renderTopToolbarCustomActions={renderTopToolbarCustomActions}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Produtos;