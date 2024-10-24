import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  createRow,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Cliente.css";

// Dados fictícios
const fakeData = [
  {
    id: "1",
    nome: "Guilherme",
    nomeSocial: "Sato",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    telefone: "(11) 91234-5678",
    create: "2024-01-01",
  },
  {
    id: "2",
    nome: "João",
    nomeSocial: "Jão",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    telefone: "(21) 98765-4321",
    create: "2024-01-02",
  },
  {
    id: "3",
    nome: "Vitor",
    nomeSocial: "Vitinho",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    telefone: "(21) 98765-4321",
    create: "2024-01-02",
  },
  {
    id: "4",
    nome: "Lucas",
    nomeSocial: "Lucão",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    telefone: "(21) 98765-4321",
    create: "2024-01-02",
  },
  {
    id: "5",
    nome: "Evandro",
    nomeSocial: "Evandreira",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    telefone: "(21) 98765-4321",
    create: "2024-01-02",
  },
  {
    id: "6",
    nome: "Potência",
    nomeSocial: "Máxima",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    telefone: "(21) 98765-4321",
    create: "2024-01-02",
  },
];

const Example = () => {
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
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
        header: "Nome",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.nome,
          helperText: validationErrors.nome,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, nome: undefined }),
        },
      },
      {
        accessorKey: "nomeSocial",
        header: "Nome Social",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.nomeSocial,
          helperText: validationErrors.nomeSocial,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, nomeSocial: undefined }),
        },
      },
      {
        accessorKey: "cpf",
        header: "CPF",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.cpf,
          helperText: validationErrors.cpf,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, cpf: undefined }),
        },
      },
      {
        accessorKey: "rg",
        header: "RG",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.rg,
          helperText: validationErrors.rg,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, rg: undefined }),
        },
      },
      {
        accessorKey: "telefone",
        header: "Telefone",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.telefone,
          helperText: validationErrors.telefone,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, telefone: undefined }),
        },
      },
      {
        accessorKey: "create",
        header: "Cadastrado em",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.create,
          helperText: validationErrors.create,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, create: undefined }),
        },
      },
    ],
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: fakeData,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    positionCreatingRow: creatingRowIndex,
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
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              if (
                window.confirm("Tem certeza que deseja deletar esse usuário?")
              ) {
                // Lógica para deletar o usuário
                console.log(`Deleted user with ID: ${row.original.id}`);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Subordinate">
          <IconButton
            onClick={() => {
              setCreatingRowIndex(table.getRowModel().rows.length);
              table.setCreatingRow(
                createRow(
                  table,
                  {
                    id: null!,
                    nome: "",
                    nomeSocial: "",
                    cpf: "",
                    rg: "",
                    telefone: "",
                    create: "",
                  },
                  -1
                )
              );
            }}
          >
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="btn-register-client"
        startIcon={<PersonAddAltIcon />}
        variant="contained"
        onClick={() => {
          setCreatingRowIndex(table.getRowModel().rows.length);
          table.setCreatingRow(true);
        }}
      >
        Cadastrar Cliente
      </Button>
    ),
  });

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <div className="example-container">
        <div className="table-wrapper">
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "30px", color: '#333' }}
          >
            Gerenciamento de Clientes
          </Typography>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Example;
