import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "../../components/Menu/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Clientes.css";

const initialData = [
  { id: "1", nome: "Guilherme", nomeSocial: "Sato", cpf: "123.456.789-00", rg: "12.345.678-9", telefone: "(11) 91234-5678", create: "2024-01-01" },
  { id: "2", nome: "João", nomeSocial: "Jão", cpf: "987.654.321-00", rg: "98.765.432-1", telefone: "(21) 98765-4321", create: "2024-01-02" },
  { id: "3", nome: "Vitor", nomeSocial: "Vitinho", cpf: "987.654.321-00", rg: "98.765.432-1", telefone: "(21) 98765-4321", create: "2024-01-02" },
  { id: "4", nome: "Lucas", nomeSocial: "Lucão", cpf: "987.654.321-00", rg: "98.765.432-1", telefone: "(21) 98765-4321", create: "2024-01-02" },
  { id: "5", nome: "Evandro", nomeSocial: "Evandreira", cpf: "987.654.321-00", rg: "98.765.432-1", telefone: "(21) 98765-4321", create: "2024-01-02" },
  { id: "6", nome: "Potência", nomeSocial: "Máxima", cpf: "987.654.321-00", rg: "98.765.432-1", telefone: "(21) 98765-4321", create: "2024-01-02" },
];

function Example() {
  const [data, setData] = useState(initialData);
  const [creatingRowIndex, setCreatingRowIndex] = useState(undefined);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const columns = [
    { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
    { accessorKey: "nome", header: "Nome", muiEditTextFieldProps: { required: true } },
    { accessorKey: "nomeSocial", header: "Nome Social", muiEditTextFieldProps: { required: true } },
    { accessorKey: "cpf", header: "CPF", muiEditTextFieldProps: { required: true } },
    { accessorKey: "rg", header: "RG", muiEditTextFieldProps: { required: true } },
    { accessorKey: "telefone", header: "Telefone", muiEditTextFieldProps: { required: true } },
    { accessorKey: "create", header: "Cadastrado em", muiEditTextFieldProps: { required: true } },
  ];

  const renderRowActions = ({ row }) => (
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
            if (window.confirm("Tem certeza que deseja deletar esse usuário?")) {
              setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderTopToolbarCustomActions = () => (
    <Button
      startIcon={<PersonAddAltIcon />}
      variant="contained"
      className="btn-register-client"
      onClick={() => setCreatingRowIndex(data.length)}
    >
      Cadastrar Cliente
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
              Gerenciamento de Clientes
            </Typography>
            <MaterialReactTable
              columns={columns}
              data={data}
              renderRowActions={renderRowActions}
              renderTopToolbarCustomActions={renderTopToolbarCustomActions}
              editingMode="row"
              onEditingRowSave={({ exitEditingMode, row, values }) => {
                setData((old) => old.map((item) => (item.id === row.id ? values : item)));
                exitEditingMode();
              }}
              onCreatingRowSave={(values) => {
                setData((old) => [...old, { ...values, id: String(old.length + 1) }]);
                setCreatingRowIndex(undefined);
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Example;
