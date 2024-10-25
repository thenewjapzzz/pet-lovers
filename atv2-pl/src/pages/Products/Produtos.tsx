import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
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

const Produtos = () => {
  const [data, setData] = useState(initialData); // Estado para armazenar dados fictícios
  const [creatingRowIndex, setCreatingRowIndex] = useState<number | undefined>();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "nome",
        header: "Nome do Produto",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.nome,
          helperText: validationErrors.nome,
          onFocus: () => setValidationErrors({ ...validationErrors, nome: undefined }),
        },
      },
      {
        accessorKey: "preco",
        header: "Preço",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.preco,
          helperText: validationErrors.preco,
          onFocus: () => setValidationErrors({ ...validationErrors, preco: undefined }),
        },
      },
      {
        accessorKey: "quantidade",
        header: "Quantidade",
        muiEditTextFieldProps: {
          required: true,
          type: "number",
          error: !!validationErrors.quantidade,
          helperText: validationErrors.quantidade,
          onFocus: () => setValidationErrors({ ...validationErrors, quantidade: undefined }),
        },
      },
      {
        accessorKey: "dataCadastro",
        header: "Data de Cadastro",
        enableEditing: false,
      },
    ],
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ row }) => {
      // Lógica para salvar a edição localmente
      setData((prevData) =>
        prevData.map((item) => (item.id === row.id ? row : item))
      );
    },
    onCreatingRowSave: ({ row }) => {
      // Lógica para adicionar nova linha localmente
      setData((prevData) => [...prevData, { ...row, id: String(prevData.length + 1) }]);
      setCreatingRowIndex(undefined);
    },
    renderRowActions: ({ row }) => (
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
              if (window.confirm("Tem certeza que deseja deletar esse produto?")) {
                // Lógica para deletar o produto localmente
                setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        className="btn-register-product"
        startIcon={<AddShoppingCartIcon />}
        variant="contained"
        onClick={() => {
          setCreatingRowIndex(data.length);
          table.setCreatingRow(true);
        }}
      >
        Cadastrar Produto
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
              sx={{ fontWeight: "bold", fontSize: "30px", color: "#333" }}
            >
              Gerenciamento de Produtos
            </Typography>
            <MaterialReactTable table={table} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Produtos;
